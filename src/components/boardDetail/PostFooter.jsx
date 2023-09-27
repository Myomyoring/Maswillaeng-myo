import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { likeService } from '../../services/like.service';
import { postService } from '../../services/post.service';
import { useAuth } from '../../context/ProvideAuthContext';

import styled from 'styled-components';
import tw from 'twin.macro';
import DeleteIcon from '../../statics/svg/delete_icon';
import EditIcon from '../../statics/svg/edit_icon';
import EmptyHeartIcon from '../../statics/svg/empty_heart_icon';
import FullHeartIcon from '../../statics/svg/full_heart_icon';
import ShareIcon from '../../statics/svg/share_icon';

const PostBottomStyle = styled.div`
  ${tw`
      flex justify-between
  `}
`;

const Likes = styled.span`
  ${tw`
     flex items-center
  `}
`;

const Buttons = styled.span`
  ${tw`
        m-3 p-2 
        flex
        border-solid border-point rounded-full
    `}

  button, a {
    ${tw`
        px-2
        `}

    svg {
      ${tw`
        fill-point
        `}
    }
  }
`;

export default function PostFooter({ post, postId, getPost, nickname }) {
  const navigate = useNavigate();
  const { getUserToken } = useAuth();
  const token = getUserToken();
  const [liked, setLiked] = useState(false);

  const saveLike = async () => {
    try {
      if (!token) return;

      const response = await likeService.saveLike({ postId, token });
      if (response.statusText === 'OK') {
        setLiked(true);
        getPost();
      }
    } catch (error) {
      setLiked(true);
      console.log(error.message);
    }
  };

  const deleteLike = async () => {
    try {
      if (!token) return;

      const response = await likeService.deleteLike({ postId, token });
      if (response.statusText === 'OK') {
        setLiked(false);
        getPost();
      }
    } catch (error) {
      setLiked(false);
      console.log(error.message);
    }
  };

  const sharePost = async () => {
    const pathname = window.location.pathname;
    const url = import.meta.env.VITE_BASE_URL + pathname;

    try {
      await navigator.clipboard.writeText(url);
      alert('클립보드에 링크가 복사 되었습니다.');
    } catch (error) {
      console.log(error.message);
    }
  };

  const deletePost = async () => {
    if (window.confirm('정말 게시물을 삭제하시겠습니까?')) {
      try {
        const response = await postService.deletePost({ postId });
        if (response.statusText === 'OK') {
          navigate(`/`, { replace: true });
          alert('삭제 되었습니다.');
        }
      } catch (error) {
        console.log(error.message);
      }
    } else return;
  };
  return (
    <PostBottomStyle>
      <Likes>
        {liked ? (
          <span onClick={deleteLike}>
            <FullHeartIcon />
          </span>
        ) : (
          <span onClick={saveLike}>
            <EmptyHeartIcon />
          </span>
        )}
        {post.likeCnt}
      </Likes>
      <Buttons>
        <button onClick={() => sharePost()}>
          <ShareIcon />
        </button>
        {nickname === post.nickname ? (
          <>
            <Link to={`/boardModify/${postId}`}>
              <EditIcon />
            </Link>
            <button onClick={deletePost}>
              <DeleteIcon />
            </button>
          </>
        ) : null}
      </Buttons>
    </PostBottomStyle>
  );
}
