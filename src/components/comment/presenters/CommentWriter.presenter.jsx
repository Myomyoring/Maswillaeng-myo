import CommentCreateButton from '../../common/EventButton';

import styled from 'styled-components';
import tw from 'twin.macro';

const CommentWriterStyle = styled.div`
  ${tw`
      p-5
      flex flex-col gap-3
      bg-lightgray
      border-solid border-gray border-t-[1px] border-b-[1px]
  `}

  button {
    ${tw`
        px-6 self-end
        font-[300]
    `}
  }
`;

const CommentArea = styled.textarea`
  ${tw`
      w-full
      m-auto p-3
    bg-white
      border-solid border-gray

      desktop:pb-11
      mobile:pb-20
  `}
`;

export default function CommentWriterPresenter({ comment, handleChangeComment, saveComment }) {
  return (
    <CommentWriterStyle>
      <CommentArea value={comment} onChange={handleChangeComment} placeholder="댓글을 작성해주세요 ." />
      <CommentCreateButton onClick={saveComment}>등록</CommentCreateButton>
    </CommentWriterStyle>
  );
}
