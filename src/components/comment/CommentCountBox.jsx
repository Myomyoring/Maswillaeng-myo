import * as S from './styles/index';

export default function CommentCountBox({ commentCount }) {
  return (
    <S.Count>
      댓글 <S.CountHighlightText>{commentCount}</S.CountHighlightText>
    </S.Count>
  );
}
