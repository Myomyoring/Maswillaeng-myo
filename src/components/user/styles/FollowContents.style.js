import styled from 'styled-components';
import tw from 'twin.macro';

export const FollowContentsStyle = styled.div`
  ${tw`
      flex justify-center gap-4
  `}
`;

export const FollowText = styled.span`
  ${tw`
      font-semibold text-lg
  `}
`;

export const FollowCountText = styled.span`
  ${tw`
      text-lg

      desktop:pl-6
      mobile:p-2
  `}
`;
