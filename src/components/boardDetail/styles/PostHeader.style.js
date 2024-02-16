import { Link } from 'react-router-dom';

import styled from 'styled-components';
import tw from 'twin.macro';

export const PostHeaderStyle = styled.div`
  ${tw`
    flex flex-col gap-3
  `}
`;

export const CategoryNameBox = styled.div`
  ${tw` 
      font-bold text-point
    `}
`;

export const CategoryLink = styled(Link)`
  ${tw``}
`;

export const PostTitleBox = styled.div`
  ${tw`
    flex justify-between items-center
  `}
`;

export const PostTitleText = styled.span`
  ${tw`
      text-2xl font-black
  `}
`;

export const LikeBox = styled.div`
  ${tw` 
      flex items-center
    `}
  svg {
    ${tw`
        mx-1
      fill-point
    `}
  }
`;

export const LikeCountText = styled.span`
  ${tw`
      text-xl text-point
    `}
`;

export const ProfileBox = styled.div`
  ${tw`
      flex items-center
      font-bold text-xs text-darkgray
    `}
`;

export const DateText = styled.span`
  ${tw`
    before:content-['|'] 
    before:mx-2
  `}
`;
