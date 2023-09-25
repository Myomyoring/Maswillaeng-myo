import { useParams } from 'react-router-dom';

import WriteContents from '../components/boardWrite/WriteContents';

import { styled } from 'styled-components';
import tw from 'twin.macro';

const BoardWriteStyle = styled.div`
  ${tw`
        w-2/3 h-full
        m-auto py-20
    `}
`;

export default function BoardWritePage() {
  const { postId } = useParams();
  return (
    <BoardWriteStyle>
      <WriteContents postId={postId} />
    </BoardWriteStyle>
  );
}
