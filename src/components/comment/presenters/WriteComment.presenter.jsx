import SaveButton from '../../common/EventButton';

import styled from 'styled-components';
import tw from 'twin.macro';

const WriteCommentStyle = styled.div`
  ${tw`
        flex justify-center items-center
    `}

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

export default function WriteCommentPresenter({ comment, handleChangeComment, saveComment }) {
  return (
    <WriteCommentStyle>
      <Comment value={comment} onChange={handleChangeComment} placeholder="댓글을 작성해주세요 ." />
      <SaveButton onClick={saveComment}>등록</SaveButton>
    </WriteCommentStyle>
  );
}
