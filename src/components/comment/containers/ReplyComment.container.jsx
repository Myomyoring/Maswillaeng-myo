import { useEffect, useState } from 'react';

import { commentService } from '../../../services/comment.service';
import { useAuth } from '../../../context/ProvideAuthContext';
import ReplyCommentPresenter from '../presenters/ReplyComment.presenter';

export default function ReplyCommentContainer({
  comment,
  replyMode,
  setReplyMode,
  replySelect,
  setReplySelect,
  getPost,
  createReplyHandler,
}) {
  const { getUserToken, currentUser } = useAuth();
  const { nickname } = currentUser();
  const token = getUserToken();
  const [replyList, setReplyList] = useState([]);

  useEffect(() => {
    getReply(comment.commentId);
  }, [comment]);

  const getReply = async (commentId) => {
    try {
      const { data } = await commentService.getReply({ commentId });
      setReplyList(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const saveReply = async () => {
    if (replySelect.replyComment === '') return;

    try {
      if (!token) return;
      const response = await commentService.saveReply({
        parentId: replySelect.parentId,
        content: replySelect.replyComment,
        token,
      });
      if (response.statusText === 'OK') {
        getPost();
        setReplyMode(false);
      } else return;
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
      const response = await commentService.updateReply({
        replyId: replySelect.replyId,
        content: replySelect.replyComment,
        token,
      });
      if (response.statusText === 'OK') {
        getPost();
        setReplyMode(false);
      } else return;
    } catch (error) {
      console.log(error.message);
    }
  };

  const deleteReply = async (replyId) => {
    if (window.confirm('정말 답글을 삭제하시겠습니까?')) {
      try {
        if (!token) return;
        const response = await commentService.deleteReply({ parentId: comment.commentId, replyId, token });
        if (response.statusText === 'OK') {
          getPost();
          console.log(response);
        } else return;
      } catch (error) {
        console.log(error);
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
        replyList,
      }}
    />
  );
}
