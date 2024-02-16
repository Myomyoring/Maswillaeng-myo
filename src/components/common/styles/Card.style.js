import { Link } from 'react-router-dom';

import styled from 'styled-components';
import tw from 'twin.macro';

export const CardStyle = styled.div`
  ${tw``}
`;

export const CardLayout = styled.span`
  ${tw`
      grid text-center
      
      desktop:grid-cols-4
      tablet:grid-cols-3
      mobile:grid-cols-2
  `}
  ${(props) =>
    props.className === 'small'
      ? tw`desktop:grid-cols-3
      tablet:grid-cols-2
      mobile:grid-cols-1
      `
      : tw`desktop:grid-cols-4
      tablet:grid-cols-3
      mobile:grid-cols-2`}
`;

export const CardContents = styled.div`
  ${tw`
      min-w-[180px]
      p-2
    `}

  a {
    &:hover {
      ${tw`underline`}
    }
  }
`;

export const TitleLink = styled(Link)`
  ${tw`
      font-bold
      grid
    `}
`;

export const Thumbnail = styled.img`
  ${tw`
        w-full min-w-[100px]
        col-span-4
        border-solid
        border-[1px]
        rounded-lg
        object-cover

        desktop:h-[260px]
        tablet:h-[220px]
        mobile:h-[140px]
  `}
`;

export const Title = styled.div`
  ${tw`
        col-span-3
        mt-3
        text-ellipsis overflow-hidden whitespace-nowrap
  `}
`;

export const CommentCount = styled.span`
  ${tw`
      flex justify-center items-center
      mt-3
      text-xs text-point
  `}
`;

export const Footer = styled.div`
  ${tw`
        p-2
        grid grid-cols-5
        text-ellipsis
        overflow-hidden
        whitespace-nowrap
        desktop:text-sm 
        tablet:text-xs
        mobile:text-xs
    `}
`;

export const Nickname = styled(Link)`
  ${tw``}
`;

export const Date = styled.span`
  ${tw`
      col-span-3
      
  `}
`;

export const Like = styled.span`
  ${tw`
    flex justify-center items-center
    gap-1
  `}
`;

export const LikeCount = styled.span`
  ${tw``}
`;

export const NothingMessage = styled.div`
  ${tw`
      p-10
      col-span-4
      text-lg
    `}
`;
