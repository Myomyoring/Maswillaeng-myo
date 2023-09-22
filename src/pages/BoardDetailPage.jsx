import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import DOMPurify from 'dompurify';

import CommentList from '../components/boardDetail/CommentList';
import { diplayBoardDetailDate } from '../utils/display_date';
import { useAuth } from '../context/ProvideAuthContext';

import { styled } from 'styled-components';
import tw from 'twin.macro';
import DeleteIcon from '../statics/svg/delete_icon';
import EditIcon from '../statics/svg/edit_icon';
import EmptyHeartIcon from '../statics/svg/empty_heart_icon';
import FullHeartIcon from '../statics/svg/full_heart_icon';
import ShareIcon from '../statics/svg/share_icon';

const BoardDetailContainer = styled.div`
  ${tw`
        w-2/3 h-full
        m-auto py-20
    `}
`;

const BoardTitle = styled.div`
  ${tw`
        mt-10 mb-2
    `}
`;

const Category = styled.h3`
  ${tw`
        my-3
        font-bold text-point
    `}
`;

const Title = styled.div`
  ${tw`
        mb-5 text-2xl font-black
    `}
`;

const Image = styled.img`
  ${tw`
        w-10 h-10
        min-w-min min-h-min
        border-solid border-gray
        rounded-full object-cover
    `}
`;

const ProfileBox = styled.div`
  ${tw`
        flex items-center
    `}

  span {
    ${tw`
        px-2
        font-bold text-xs text-darkgray
    `}
  }

  div {
    ${tw`
        px-2
        font-bold
    `}
  }
`;

const Content = styled.div`
  ${tw`
        w-full h-auto
        p-10
        border-solid border-gray
        bg-white
    `}

  img {
    ${tw`
        m-auto
      `}
  }
`;

const ButtonBox = styled.div`
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

const CommentBox = styled.div`
  ${tw`
        w-full
        p-5
        bg-lightgray
        border-solid border-t-gray border-l-0 border-r-0 border-b-0

    `}
`;

const CommentCnt = styled.div`
  ${tw`
    py-5 
    font-semibold text-lg
  `}

  span {
    ${tw`
    font-bold text-point
    `}
  }
`;

const CommentContents = styled.div`
  ${tw`
        mt-3 text-right
  `}

  * {
    ${tw`
        mx-0.5
    `}
  }

  span {
    ${tw`
        text-xxs
    `}
  }

  button {
    ${tw`
        ml-5 px-5
    `}
  }
`;

const Button = styled(Link)`
  ${tw`
        p-3
      bg-point
        font-bold text-white text-sm
        cursor-pointer
    `}
`;

const WriteComment = styled.textarea`
  ${tw`
    w-full
    p-3
    block
  bg-white
    border-solid border-gray
  `}
`;

const Comment = styled.div`
  ${tw`
    bg-white
  `}
`;

export default function BoardDetailPage() {
  const { postId } = useParams();
  const { getUserToken } = useAuth();
  const navigate = useNavigate();
  const [post, setPost] = useState({});
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');

  // 상세페이지 접근할 때, 해당 게시물의 id를 받아 상세 게시물 내용 불러오기, 그 id가 변할 때 마다 useEffect로 리렌더링
  useEffect(() => {
    getPost();
  }, [postId]);

  // 비동기 게시물 불러오기
  const getPost = async () => {
    try {
      const response = await axios.get(`/api/post/${postId}`);
      if (response.statusText === 'OK') {
        setPost(response.data);
        setComments(response.data.commentList);
      }
    } catch (err) {
      console.log(err);
    }
  };
  // 클립보드에 url 복사 (공유)
  const sharePost = async () => {
    // 로컬용 url
    const baseUrl = 'http://localhost:3000';
    const pathname = window.location.pathname;
    const url = baseUrl + pathname;

    try {
      const res = await navigator.clipboard.writeText(url);
      alert('클립 보드에 링크가 복사 되었습니다.');
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  // 게시물 삭제 요청
  const deletePost = async () => {
    if (window.confirm('정말 게시물을 삭제하시겠습니까?')) {
      try {
        const response = await axios.delete(`/api/post/${postId}`);
        if (response.statusText === 'OK') {
          navigate('/', { replace: true });
          alert('삭제 되었습니다.');
        }
      } catch (err) {
        console.log(err);
      }
    } else return;
  };

  // 댓글 작성 onChange
  const handleChangeComment = ({ target }) => {
    const { value } = target;
    setComment(value);
  };

  // 댓글 작성 요청
  const commentSubmit = async () => {
    if (comment === '') {
      alert('댓글을 입력해주세요');
      return;
    }

    try {
      const token = getUserToken();
      if (!token) return;

      const response = await axios.post(
        '/api/comment',
        { postId: postId, content: comment },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response.statusText === 'OK') {
        setComment('');
        getPost();
      }
    } catch (err) {
      console.log(err);
    }
  };

  // 좋아요 요청
  const handleLike = async () => {
    try {
      const token = getUserToken();
      if (!token) return;

      const res = await axios.post(
        `/api/like/${postId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (res.statusText === 'OK') {
        setLiked(true);
        getPost();
      }
    } catch (err) {
      setLiked(true);
      console.error(err);
    }
  };

  // 좋아요 취소 요청
  const deleteLike = async () => {
    try {
      const token = getUserToken();
      if (!token) return;

      const res = await axios.delete(`/api/like/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.statusText === 'OK') {
        setLiked(false);
        getPost();
      }
    } catch (err) {
      setLiked(false);
      console.error(err);
    }
  };

  return (
    <>
      <BoardDetailContainer>
        <BoardTitle>
          <Category>{post.category}</Category>
          <Title>{post.title}</Title>
          <ProfileBox>
            <Image src={post.userImage} />
            <div>{post.nickname}</div>
            <span>|</span>
            <span>{diplayBoardDetailDate(post.createdDate)}</span>
          </ProfileBox>
        </BoardTitle>

        <Content
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(String(post.content)),
          }}
        />

        <ButtonBox>
          <Likes>
            {liked ? (
              <span onClick={deleteLike}>
                <FullHeartIcon />
              </span>
            ) : (
              <span onClick={handleLike}>
                <EmptyHeartIcon />
              </span>
            )}
            {post.likeCnt}
          </Likes>
          <Buttons>
            <button onClick={() => sharePost()}>
              <ShareIcon />
            </button>
            <Link to={`/boardmodify/${postId}`}>
              <EditIcon />
            </Link>
            <button onClick={deletePost}>
              <DeleteIcon />
            </button>
          </Buttons>
        </ButtonBox>

        {/* 댓글 */}
        <CommentBox>
          <WriteComment value={comment} onChange={handleChangeComment} placeholder="댓글을 작성해주세요 ." />
          <CommentContents>
            {/* <span>비밀 댓글</span>
            <LockIcon />
            <input type="checkbox" alt="비밀 댓글" /> */}
            <Button onClick={commentSubmit}>등록</Button>
          </CommentContents>
        </CommentBox>

        <CommentCnt>
          댓글 <span>{comments.length}</span>
        </CommentCnt>

        <Comment>
          <CommentList comments={comments} getPost={getPost} />
        </Comment>

        <Button to={'/'}>목록으로</Button>
      </BoardDetailContainer>
    </>
  );
}
