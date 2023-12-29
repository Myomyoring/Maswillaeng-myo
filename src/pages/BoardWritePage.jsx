import WriteContents from '../components/boardWrite/containers/WriteContents.container';

import { styled } from 'styled-components';
import tw from 'twin.macro';

const BoardWritePageStyle = styled.div`
  ${tw`
        h-full
        m-auto py-20
        desktop:w-2/3
        mobile:w-5/6
    `}
`;

export default function BoardWritePage() {
  return (
    <BoardWritePageStyle>
      <WriteContents />
    </BoardWritePageStyle>
  );
}
