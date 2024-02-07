import styled from 'styled-components';
import tw from 'twin.macro';

export const FollowListStyle = styled.div`
  ${tw`
      h-auto max-h-[500px]
      grid
      p-5
      text-xs
      overflow-scroll

      desktop:grid-cols-4
      tablet:grid-cols-3
      mobile:grid-cols-2
    `}
  span {
    ${tw`m-1`}
  }
`;
