import WriteContents from '../components/boardWrite/containers/WriteContents.container';

import { styled } from 'styled-components';
import tw from 'twin.macro';

const BoardWriteStyle = styled.div`
  ${tw`
        w-2/3 h-full
        m-auto py-20
    `}
`;

export default function BoardWritePage() {
  return (
    <BoardWriteStyle>
      <WriteContents />
    </BoardWriteStyle>
  );
}
