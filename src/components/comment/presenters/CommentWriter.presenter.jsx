import CommentCreateButton from '../../common/EventButton';

import styled from 'styled-components';
import tw from 'twin.macro';

const CommentWriterStyle = styled.div`
  ${tw`
      grid grid-cols-[5fr_1fr] gap-3
  `}
`;

const CommentArea = styled.textarea`
  ${tw`
      p-3
    bg-white
      border-solid border-gray
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
