import { useState } from 'react';

import WriteCommentPresenter from '../presenters/WriteComment.presenter';
import { commentService } from '../../../services/firebaseService/comment.firebase.service';

export default function WriteCommentContainer({ id, postId, getComments }) {
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
  return <WriteCommentPresenter {...{ comment, handleChangeComment, saveComment }} />;
}
