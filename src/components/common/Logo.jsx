import { Link } from 'react-router-dom';

import styled from 'styled-components';
import tw from 'twin.macro';

const LogoStyle = styled(Link)`
  ${tw`
      font-bold
  `}
  span {
    ${tw`
        text-3xl
    `}
  }
`;

export default function Logo() {
  return (
    <LogoStyle to={'/'}>
      <span>Mashillaeng</span>
    </LogoStyle>
  );
}
