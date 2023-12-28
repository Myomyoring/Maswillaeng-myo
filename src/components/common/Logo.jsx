import { Link } from 'react-router-dom';

import styled from 'styled-components';
import tw from 'twin.macro';

const LogoStyle = styled.div`
  ${tw``}
`;
const Text = styled.span`
  ${tw`
        font-bold text-black
    `}
  ${(props) => (props.color === 'white' ? tw`text-white` : tw``)}
  ${(props) => (props.size === 'big' ? tw`text-5xl` : tw`text-3xl`)}
`;

export default function Logo({ color, size }) {
  return (
    <LogoStyle>
      <Link to={'/'}>
        <Text color={color} size={size}>
          Mashillaeng
        </Text>
      </Link>
    </LogoStyle>
  );
}
