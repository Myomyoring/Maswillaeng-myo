import styled from 'styled-components';
import tw from 'twin.macro';

export const BoardHeaderStyle = styled.div`
  ${tw`
      w-full h-16
      flex items-center justify-end
    `}

  a {
    ${tw`
        rounded-md
      `}
  }

  svg {
    ${tw`
      fill-white
    `}
  }
`;
