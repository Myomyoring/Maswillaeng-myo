import ImageLabel from '../components/board/ImageLabel';
import PostList from '../components/board/containers/PostList.container';

import styled from 'styled-components';
import tw from 'twin.macro';

const BoardStyle = styled.div`
  ${tw`
        w-full h-full
        desktop:p-16
        tablet:p-10
        mobile:p-4
    `}
`;

export default function BoardPage() {
  return (
    <>
      <ImageLabel />
      <BoardStyle>
        <PostList />
      </BoardStyle>
    </>
  );
}
