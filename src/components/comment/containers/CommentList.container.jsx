import { useState } from 'react';
import { useAuth } from '../../../context/ProvideAuthContext';

import CommentListPresenter from '../presenters/CommentList.presenter';

export default function CommentList({ commentCount, comments, getPost }) {
  const { getUserToken, currentUser } = useAuth();
  const token = getUserToken();
  const { nickname } = currentUser();

  const [modifyMode, setModifyMode] = useState(false);
  const [replyMode, setReplyMode] = useState(false);
  const [modifySelect, setModifySelect] = useState({ modifyCommentId: 0, modifyContent: '' });
  const [replySelect, setReplySelect] = useState({ mode: '', parentId: 0, replyId: 0, replyComment: '' });

  const modifyCommentHandler = (id, content) => {
    setModifyMode(true);
    setModifySelect({ modifyCommentId: id, modifyContent: content });
  };

  const createReplyHandler = (parentId) => {
    setReplyMode(true);
    setReplySelect({ mode: 'create', parentId: parentId });
  };

  const updateComment = async () => {
    try {
      if (!token) return;

      const response = await commentService.updateComment({
        commentId: modifySelect.modifyCommentId,
        content: modifySelect.modifyContent,
        token,
      });
      if (response.statusText === 'OK') {
        setModifyMode(false);
        getPost();
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const deleteComment = async (commentId) => {
    if (window.confirm('정말 댓글을 삭제하시겠습니까?')) {
      try {
        if (!token) return;
        const response = await commentService.deleteComment({ commentId, token });
        if (response.statusText === 'OK') {
          getPost();
        }
      } catch (error) {
        console.log(error.message);
      }
    } else return;
  };

  return (
    <CommentListPresenter
      {...{
        getPost,
        nickname,
        comments,
        commentCount,
        modifyMode,
        modifySelect,
        setModifySelect,
        setModifyMode,
        createReplyHandler,
        modifyCommentHandler,
        deleteComment,
        updateComment,
        replyMode,
        replySelect,
        setReplyMode,
        setReplySelect,
      }}
    />
  );
}
