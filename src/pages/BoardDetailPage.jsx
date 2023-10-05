import PostContents from '../components/boardDetail/containers/PostContents.container';

import { styled } from 'styled-components';
import tw from 'twin.macro';

const PostStyle = styled.div`
  ${tw`
        w-2/3 h-full
        m-auto py-10
    `}
`;

export default function BoardDetailPage() {
  return (
    <PostStyle>
      <PostContents />
    </PostStyle>
  );
}
