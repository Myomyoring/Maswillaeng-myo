import styled from 'styled-components';
import tw from 'twin.macro';

export const LogoStyle = styled.div`
  ${tw``}
`;

export const Text = styled.span`
  ${tw`
        font-bold text-black
    `}
  ${(props) => (props.color === 'white' ? tw`text-white` : tw``)}
  ${(props) => (props.size === 'big' ? tw`text-5xl` : tw`text-3xl`)}
`;
