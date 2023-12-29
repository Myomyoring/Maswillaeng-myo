import { useState } from 'react';

import CommentWriterPresenter from '../presenters/CommentWriter.presenter';
import { commentService } from '../../../services/firebaseService/comment.firebase.service';

export default function CommentWriterContainer({ id, postId, getComments }) {
  const [comment, setComment] = useState('');

  const handleChangeComment = ({ target }) => {
    const { value } = target;
    setComment(value);
  };

  const saveComment = async () => {
    if (comment === '') {
      alert('댓글을 입력해주세요');
      return;
    }
    try {
      await commentService.saveComment({ postId, userId: id, comment });
      getComments();
      setComment('');
    } catch (error) {
      console.log(error.code);
    }
  };
  return <CommentWriterPresenter {...{ comment, handleChangeComment, saveComment }} />;
}
