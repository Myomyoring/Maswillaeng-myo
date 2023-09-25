import { useState } from 'react';

import { commentService } from '../../services/comment.service';
import { useAuth } from '../../context/ProvideAuthContext';
import EventButton from '../common/EventButton';

import styled from 'styled-components';
import tw from 'twin.macro';

const WriteCommentStyle = styled.div`
  ${tw`flex justify-center items-center`}

  button {
    ${tw`
        mx-3 p-5
    `}
  }
`;

const Comment = styled.textarea`
  ${tw`
      w-10/12
      p-3
    bg-white
      border-solid border-gray
  `}
`;

export default function WriteComment({ postId, getPost }) {
  const { getUserToken } = useAuth();
  const token = getUserToken();
  const [comment, setComment] = useState('');

  const handleChangeComment = ({ target }) => {
    const { value } = target;
    setComment(value);
  };

  const commentSubmit = async () => {
    if (comment === '') {
      alert('댓글을 입력해주세요');
      return;
    }
    try {
      if (!token) return;

      const response = await commentService.submitComment({ postId, content: comment, token });
      if (response.statusText === 'OK') {
        setComment('');
        getPost();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <WriteCommentStyle>
      <Comment value={comment} onChange={handleChangeComment} placeholder="댓글을 작성해주세요 ." />
      <EventButton onClick={commentSubmit}>등록</EventButton>
    </WriteCommentStyle>
  );
}
