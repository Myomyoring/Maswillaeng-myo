import BoardContainer from '../components/boardList/BoardContainer';
import ImageLabel from '../components/boardList/ImageLabel';

import styled from 'styled-components';
import tw from 'twin.macro';

const BoardStyle = styled.div`
  ${tw`
        w-full h-auto
        p-16
    `}
`;

export default function BoardListPage() {
  return (
    <>
      <ImageLabel />
      <BoardStyle>
        <BoardContainer />
      </BoardStyle>
    </>
  );
}
