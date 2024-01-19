import { useAuth } from '../../../contexts/ProvideAuthContext';
import ReplyCommentPresenter from '../presenters/ReplyComment.presenter';
import { commentService } from '../../../services/firebaseService/comment.firebase.service';

export default function ReplyCommentContainer({
  postId,
  comment,
  replyMode,
  setReplyMode,
  replySelect,
  setReplySelect,
  getReplies,
  replies,
  createReplyHandler,
}) {
  const { currentUser } = useAuth();
  const { id, nickname } = currentUser();

  const saveReply = async () => {
    if (replySelect.replyComment === '') return;
    try {
      const response = await commentService.saveReply({
        parentId: replySelect.parentId,
        postId,
        userId: id,
        comment: replySelect.replyComment,
      });
      console.log(response);
      getReplies();
      setReplySelect({ replyComment: '' });
      setReplyMode(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  const modifyReplyHandler = async (parentId, replyId, content) => {
    setReplyMode(true);
    setReplySelect({ mode: 'update', parentId: parentId, replyId: replyId, replyComment: content });
  };

  const updateReply = async () => {
    try {
      await commentService.updateReply({
        commentId: replySelect.replyId,
        comment: replySelect.replyComment,
      });
      setReplyMode(false);
      getReplies();
    } catch (error) {
      console.log(error.code);
    }
  };

  const deleteReply = async (replyId) => {
    if (window.confirm('정말 답글을 삭제하시겠습니까?')) {
      try {
        await commentService.deleteReply({ commentId: replyId });
        getReplies();
      } catch (error) {
        console.log(error.code);
      }
    } else return;
  };

  return (
    <ReplyCommentPresenter
      {...{
        nickname,
        comment,
        replyMode,
        setReplyMode,
        replySelect,
        setReplySelect,
        updateReply,
        createReplyHandler,
        saveReply,
        modifyReplyHandler,
        deleteReply,
        replies,
      }}
    />
  );
}
