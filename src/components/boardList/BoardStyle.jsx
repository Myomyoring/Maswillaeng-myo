import React from 'react';
import { styled } from 'styled-components';
import tw from 'twin.macro';

const Board = styled.div`
    ${tw`
        w-full h-auto
        p-16
    `}
`

export default function BoardStyle({ children }) {
    return (
        <Board>{ children }</Board>
    );
}