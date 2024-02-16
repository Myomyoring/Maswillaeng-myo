import { onSnapshot } from 'firebase/firestore';

import { CONFIRM_MESSAGE } from '../../../constants';
import { commentService } from '../../../services/firebaseService/comment.firebase.service';
import { likeService } from '../../../services/firebaseService/like.firebase.service';
import { postService } from '../../../services/firebaseService/post.firebase.service';
import { useRouter } from '../../../hooks/useRouter';

import * as S from '../styles/PostFooter.style';
import DeleteIcon from '../../../statics/svg/delete_icon';
import EditIcon from '../../../statics/svg/edit_icon';
import PostFooterPresenter from '../presenters/PostFooter.presenter';

export default function PostFooterContainer({ postId, nickname, writer }) {
  const { authRouteTo } = useRouter();

  const sharePost = async () => {
    const pathname = window.location.pathname;
    const url = import.meta.env.VITE_BASE_URL + pathname;
    try {
      await navigator.clipboard.writeText(url);
      alert(CONFIRM_MESSAGE.CLIPBOARD_MESSAGE);
    } catch (error) {
      console.log(error);
    }
  };

  const deletePost = async () => {
    if (window.confirm(CONFIRM_MESSAGE.POST_DELETE_CONFIRM_MESSAGE)) {
      try {
        await likeService.deleteAllLikes({ postId });
        const commentsQuery = commentService.getComments({ postId });
        onSnapshot(commentsQuery, (snapshot) => {
          snapshot.docs.map((doc) => {
            commentService.deleteComment({ commentId: doc.id });
          });
        });
        const repliesQuery = commentService.getReplies({ postId });
        onSnapshot(repliesQuery, (snapshot) => {
          snapshot.docs.map((doc) => {
            commentService.deleteReply({ commentId: doc.id });
          });
        });
        await postService.deletePost({ postId });
        authRouteTo(`/`);
        alert(CONFIRM_MESSAGE.POST_DELETE_SUCCESS_MESSAGE);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <PostFooterPresenter {...{ sharePost }}>
      {nickname === writer ? (
        <>
          <S.UpdatePostButton to={`/boardModify/${postId}/${writer}`}>
            <EditIcon />
          </S.UpdatePostButton>
          <S.DeletePostButton onClick={deletePost}>
            <DeleteIcon />
          </S.DeletePostButton>
        </>
      ) : null}
    </PostFooterPresenter>
  );
}
