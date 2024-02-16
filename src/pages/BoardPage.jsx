import ImageDecoration from '../components/board/ImageDecoration';
import PostList from '../components/board/containers/PostList.container';

import * as S from './styles/Board.style';

export default function BoardPage() {
  return (
    <>
      <ImageDecoration />
      <S.BoardPageStyle>
        <PostList />
      </S.BoardPageStyle>
    </>
  );
}
