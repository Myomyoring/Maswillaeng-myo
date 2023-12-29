import PostContents from '../components/boardDetail/containers/PostContents.container';

import { styled } from 'styled-components';
import tw from 'twin.macro';

const BoardDetailPageStyle = styled.div`
  ${tw`
        w-2/3 h-full
        mx-auto py-20
    `}
`;

export default function BoardDetailPage() {
  return (
    <BoardDetailPageStyle>
      <PostContents />
    </BoardDetailPageStyle>
  );
}
