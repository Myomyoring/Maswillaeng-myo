import { Link } from 'react-router-dom';

import styled from 'styled-components';
import tw from 'twin.macro';

const LogoStyle = styled(Link)`
  ${tw`
      font-bold
  `}
`;

export default function Logo() {
  return (
    <LogoStyle to={'/'}>
      <h1>Mashillaeng</h1>
    </LogoStyle>
  );
}
