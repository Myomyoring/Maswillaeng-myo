import { Link } from 'react-router-dom';

import styled from 'styled-components';
import tw from 'twin.macro';

export const PostFooterStyle = styled.div`
  ${tw`
      flex justify-end
  `}
`;
export const PostToolsBox = styled.div`
  ${tw` 
        flex gap-4
        border-solid border-2 border-point rounded-full

        tablet:px-5
        tablet:py-2
        mobile:px-2
        mobile:py-1
    `}
  svg {
    ${tw`
        fill-point
      `}
  }
`;

export const SharePostButton = styled.button`
  ${tw`p-0`}
`;

export const UpdatePostButton = styled(Link)`
  ${tw``}
`;

export const DeletePostButton = styled.button`
  ${tw`p-0`}
`;
