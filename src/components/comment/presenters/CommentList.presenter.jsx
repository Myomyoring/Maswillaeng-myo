import * as S from '../styles/index';
import CommentCountBox from '../CommentCountBox';

export default function CommentListPresenter({ commentCount, children }) {
  return (
    <S.CommentListStyle>
      <CommentCountBox {...{ commentCount }} />
      {children}
    </S.CommentListStyle>
  );
}
