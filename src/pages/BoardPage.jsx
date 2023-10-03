import BoardContainer from '../components/board/BoardContainer';
import ImageLabel from '../components/board/ImageLabel';

import styled from 'styled-components';
import tw from 'twin.macro';

const BoardStyle = styled.div`
  ${tw`
        w-full h-auto
        p-16
    `}
`;

export default function BoardPage() {
  return (
    <>
      {/* <ImageLabel /> */}
      <BoardStyle>
        <BoardContainer />
      </BoardStyle>
    </>
  );
}
