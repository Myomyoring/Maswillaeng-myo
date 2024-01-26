import styled from 'styled-components';
import tw from 'twin.macro';

export const ImageDecorationStyle = styled.div`
  ${tw`
      tablet:block
      mobile:hidden
  `}
`;

export const Image = styled.img`
  ${tw`
      w-full h-28
      object-cover
  `}
`;
