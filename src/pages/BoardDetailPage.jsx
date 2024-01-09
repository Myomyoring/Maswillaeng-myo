import PostContents from '../components/boardDetail/containers/PostContents.container';

import { styled } from 'styled-components';
import tw from 'twin.macro';

const BoardDetailPageStyle = styled.div`
  ${tw`
        h-full
        mx-auto py-20

        desktop:w-2/3
        mobile:px-3
    `}
`;

export default function BoardDetailPage() {
  return (
    <BoardDetailPageStyle>
      <PostContents />
    </BoardDetailPageStyle>
  );
}
