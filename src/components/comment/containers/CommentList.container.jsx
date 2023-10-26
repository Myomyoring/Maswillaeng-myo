import { useState } from 'react';
import { useAuth } from '../../../context/ProvideAuthContext';

import CommentListPresenter from '../presenters/CommentList.presenter';
import { commentService } from '../../../services/firebaseService/comment.firebase.service';

export default function CommentList({ postId, getComments, getReplies, comments, replies, commentCount }) {
  const { currentUser } = useAuth();
  const { nickname } = currentUser();

  const [modifyMode, setModifyMode] = useState(false);
  const [replyMode, setReplyMode] = useState(false);
  const [modifySelect, setModifySelect] = useState({ modifyCommentId: '', modifyComment: '' });
  const [replySelect, setReplySelect] = useState({ mode: '', parentId: '', replyId: '', replyComment: '' });

  const modifyCommentHandler = (id, comment) => {
    setModifyMode(true);
    setModifySelect({ modifyCommentId: id, modifyComment: comment });
  };

  const createReplyHandler = (parentId) => {
    setReplyMode(true);
    setReplySelect({ mode: 'create', parentId: parentId });
  };

  const updateComment = async () => {
    try {
      await commentService.updateComment({
        commentId: modifySelect.modifyCommentId,
        comment: modifySelect.modifyComment,
      });
      setModifyMode(false);
      getComments();
    } catch (error) {
      console.log(error.code);
    }
  };

  const deleteComment = async (commentId) => {
    if (window.confirm('정말 댓글을 삭제하시겠습니까?')) {
      try {
        await commentService.deleteComment({ commentId });
        getComments();
      } catch (error) {
        console.log(error.code);
      }
    } else return;
  };

  return (
    <CommentListPresenter
      {...{
        postId,
        getComments,
        getReplies,
        nickname,
        comments,
        replies,
        commentCount,
        updateComment,
        deleteComment,
        modifyMode,
        modifySelect,
        modifyCommentHandler,
        createReplyHandler,
        setModifySelect,
        setModifyMode,
        replyMode,
        replySelect,
        setReplyMode,
        setReplySelect,
      }}
    />
  );
}
