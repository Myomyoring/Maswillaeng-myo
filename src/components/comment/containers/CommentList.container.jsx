import { useState } from 'react';
import { useAuth } from '../../../contexts/ProvideAuthContext';

import { commentService } from '../../../services/firebaseService/comment.firebase.service';

import CommentBox from '../CommentBox';
import CommentListPresenter from '../presenters/CommentList.presenter';
import ReplyComment from './ReplyComment.container';
import UpdateCommentBox from '../UpdateCommentBox';

export default function CommentList({ commentCount, comments, replies, onDeleteComment }) {
  const { currentUser } = useAuth();
  const { nickname } = currentUser();

  const [updateMode, setUpdateMode] = useState(false);
  const [replyMode, setReplyMode] = useState(false);
  const [updateSelect, setUpdateSelect] = useState({ id: '', comment: '' });
  const [replySelect, setReplySelect] = useState({ mode: '', parentId: '', replyId: '', replyComment: '' });

  const updateCommentHandler = (id, comment) => {
    setUpdateMode(true);
    setUpdateSelect({ id: id, comment: comment });
  };

  const createReplyHandler = (parentId) => {
    setReplyMode(true);
    setReplySelect({ mode: 'create', parentId: parentId });
  };

  const onCommentChange = (event) => {
    setUpdateSelect({ ...updateSelect, comment: event.target.value });
  };

  const onUpdateComment = async () => {
    try {
      await commentService.updateComment({
        commentId: updateSelect.id,
        comment: updateSelect.comment,
      });
      setUpdateMode(false);
    } catch (error) {
      console.log(error.code);
    }
  };

  return (
    <CommentListPresenter {...{ commentCount }}>
      {comments?.map((comment, index) =>
        updateMode && comment.commentId === updateSelect.id ? (
          <div key={index}>
            <UpdateCommentBox {...{ comment, updateSelect, onCommentChange, onUpdateComment, setUpdateMode }} />
          </div>
        ) : (
          <div key={index}>
            <CommentBox {...{ nickname, comment, createReplyHandler, updateCommentHandler, onDeleteComment }} />
            <ReplyComment
              {...{
                replies,
                comment,
                replyMode,
                setReplyMode,
                createReplyHandler,
                replySelect,
                setReplySelect,
                commentCount,
              }}
            />
          </div>
        ),
      )}
    </CommentListPresenter>
  );
}
