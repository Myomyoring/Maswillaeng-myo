import { Link } from 'react-router-dom';

import styled from 'styled-components';
import tw from 'twin.macro';

const LogoStyle = styled.div`
  ${tw``}
`;
const Text = styled.span`
  ${tw`
        font-bold text-3xl text-white
    `}
`;

export default function Logo() {
  return (
    <LogoStyle>
      <Link to={'/'}>
        <Text>Mashillaeng</Text>
      </Link>
    </LogoStyle>
  );
}
