import { useState } from 'react';

import PostFooterPresenter from '../presenters/PostFooter.presenter';
import { Navi } from '../../common/Navi';
import { postService } from '../../../services/firebaseService/post.firebase.service';
import { likeService } from '../../../services/firebaseService/like.firebase.service';

export default function PostFooterContainer({ id, post, postId, getPost, nickname, writer }) {
  const { authNavi } = Navi();
  const [liked, setLiked] = useState(false);

  const handleLike = async (likeType) => {
    try {
      let likeCnt = 0;
      const response = await likeService.getLikes({ postId });
      response.forEach((doc) => {
        let data = doc.data();
        likeCnt = data['likeUsers'].length;
      });
      if (likeType === 'save') {
        await likeService.saveLike({ postId, userId: id });
        await likeService.addLike({ postId, likeCnt });
      } else if (likeType === 'delete') {
        await likeService.deleteLike({ postId, userId: id });
        await likeService.removeLike({ postId, likeCnt });
      }
      getPost();
      if (likeType === 'save') {
        setLiked(true);
      } else {
        setLiked(false);
      }
    } catch (error) {
      console.log(error.code);
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
        await postService.deletePost({ postId });
        await likeService.deleteAllLikes({ postId });
        // await commentService.
        authNavi(`/`);
        alert('삭제 되었습니다.');
      } catch (error) {
        console.log(error.code);
      }
    } else return;
  };

  return <PostFooterPresenter {...{ nickname, post, postId, handleLike, liked, sharePost, deletePost, writer }} />;
}
