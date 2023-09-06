import React from 'react';
import { styled } from 'styled-components';
import tw from 'twin.macro';

const Ul = styled.ul`
  ${tw`
        w-full h-12
        flex justify-center
    `}
`;
export default function ToggleBody({ children }) {
  return <Ul>{children ? children : '준비 중'}</Ul>;
}
