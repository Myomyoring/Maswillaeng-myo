import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../../../context/ProvideAuthContext';
import PostFooterPresenter from '../presenters/PostFooter.presenter';

export default function PostFooterContainer({ post, postId, getPost, nickname }) {
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

  return <PostFooterPresenter {...{ nickname, post, postId, liked, deleteLike, saveLike, sharePost, deletePost }} />;
}
