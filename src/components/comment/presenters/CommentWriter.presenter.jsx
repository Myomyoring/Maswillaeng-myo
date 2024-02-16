import CommentCreateButton from '../../common/EventButton';

import * as S from '../styles/index';

export default function CommentWriterPresenter({ comment, onChange, onSaveComment, isLoading }) {
  return (
    <S.CommentWriterStyle>
      <S.CommentArea value={comment} onChange={onChange} placeholder="댓글을 작성해주세요 ." />
      <CommentCreateButton disabled={isLoading} onClick={onSaveComment}>
        {isLoading ? '로딩 중' : '등록'}
      </CommentCreateButton>
    </S.CommentWriterStyle>
  );
}
