import ImageLabel from '../components/board/ImageLabel';
import PostList from '../components/board/containers/PostList.container';

import * as S from './styles/Board.style';

export default function BoardPage() {
  return (
    <>
      <ImageLabel />
      <S.BoardPageStyle>
        <PostList />
      </S.BoardPageStyle>
    </>
  );
}
