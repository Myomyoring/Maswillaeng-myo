import { useState } from 'react';

import { useAuth } from '../../../context/ProvideAuthContext';

import WriteCommentPresenter from '../presenters/WriteComment.presenter';

export default function WriteCommentContainer({ postId, getPost }) {
  const { getUserToken } = useAuth();
  const token = getUserToken();
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
      if (!token) return;

      const response = await commentService.saveComment({ postId, content: comment, token });
      if (response.statusText === 'OK') {
        setComment('');
        getPost();
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return <WriteCommentPresenter {...{ comment, handleChangeComment, saveComment }} />;
}
