import { Link } from 'react-router-dom';

import styled from 'styled-components';
import tw from 'twin.macro';

export const EventButtonStyle = styled.button`
  ${tw`
        p-3
        font-bold text-white text-sm
        cursor-pointer
    `}
  ${(props) => (props.disabled ? tw`bg-gray cursor-not-allowed` : tw`bg-point`)}
`;

export const FormButtonStyle = styled.button`
  ${tw`
        p-3
        font-bold text-white text-sm
        cursor-pointer
    `}
  ${(props) => (props.disabled ? tw`bg-gray cursor-not-allowed` : tw`bg-point`)}
  ${(props) => (props.width === 'full' ? tw`w-full` : tw``)}
`;

export const LinkButtonStyle = styled(Link)`
  ${tw`
    p-3
    bg-point
    text-white
  `}
`;
