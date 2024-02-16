import BoardListLink from '../../common/LinkButton';

import * as S from '../styles/PostContents.style';

export default function PostContentsPresenter({ children }) {
  return (
    <S.PostContentsStyle>
      {children}
      <BoardListLink to={'/'}>목록으로</BoardListLink>
    </S.PostContentsStyle>
  );
}
