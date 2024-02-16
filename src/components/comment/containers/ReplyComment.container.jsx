import { useParams } from 'react-router-dom';

import { commentService } from '../../../services/firebaseService/comment.firebase.service';
import { CONFIRM_MESSAGE } from '../../../constants';
import { useAuth } from '../../../contexts/ProvideAuthContext';

import ReplyBox from '../ReplyBox';
import ReplyCommentPresenter from '../presenters/ReplyComment.presenter';
import ReplyWriteBox from '../ReplyWriteBox';
import UpdateReplyBox from '../UpdateReplyBox';

export default function ReplyCommentContainer({
  comment,
  replyMode,
  setReplyMode,
  replies,
  createReplyHandler,
  replySelect,
  setReplySelect,
  commentCount,
}) {
  const { postId } = useParams();
  const { currentUser } = useAuth();
  const { userId, nickname, userImage } = currentUser();

  const onReplyChange = (event) => {
    setReplySelect({ ...replySelect, replyComment: event.target.value });
  };

  const onSaveReply = async () => {
    if (replySelect.replyComment === '') {
      alert(CONFIRM_MESSAGE.COMMENT_EMPTY_ERROR);
      return;
    }
    try {
      await commentService.saveReply({
        postId,
        userId,
        parentId: replySelect.parentId,
        comment: replySelect.replyComment,
      });
      await commentService.updateCommentCount({ postId, commentCount: commentCount + 1 });
      setReplyMode(false);
    } catch (error) {
      console.log(error);
    }
  };

  const onUpdateReply = async () => {
    if (replySelect.replyComment === '') {
      alert(CONFIRM_MESSAGE.COMMENT_EMPTY_ERROR);
      return;
    }
    try {
      await commentService.updateReply({
        commentId: replySelect.replyId,
        comment: replySelect.replyComment,
      });
      setReplyMode(false);
    } catch (error) {
      console.log(error.code);
    }
  };

  const onDeleteReply = async (replyId) => {
    if (window.confirm(CONFIRM_MESSAGE.COMMENT_DELETE_CONFIRM_MESSAGE)) {
      try {
        await commentService.deleteReply({ commentId: replyId });
        await commentService.updateCommentCount({ postId, commentCount: commentCount - 1 });
      } catch (error) {
        console.log(error.code);
      }
    }
  };

  const updateReplyHandler = (parentId, replyId, content) => {
    setReplyMode(true);
    setReplySelect({ mode: 'update', parentId: parentId, replyId: replyId, replyComment: content });
  };

  return (
    <ReplyCommentPresenter>
      {replyMode && replySelect.parentId === comment.commentId && replySelect.mode === 'update' ? (
        <UpdateReplyBox {...{ comment, nickname, replySelect, onReplyChange, onUpdateReply, setReplyMode }} />
      ) : (
        replies.map(
          (reply, index) =>
            comment.commentId === reply.parentId && (
              <div key={index}>
                <ReplyBox {...{ nickname, comment, reply, createReplyHandler, updateReplyHandler, onDeleteReply }} />
              </div>
            ),
        )
      )}
      {replyMode && replySelect.parentId === comment.commentId && replySelect.mode === 'create' ? (
        <ReplyWriteBox {...{ nickname, userImage, replySelect, onReplyChange, onSaveReply, setReplyMode }} />
      ) : null}
    </ReplyCommentPresenter>
  );
}
