import React from 'react';
import { styled } from 'styled-components';
import tw from 'twin.macro';
import ToggleBody from './ToggleBody';
import ToggleItem from './ToggleItem';

const ToggleStyle = styled.div`
    ${tw`
        w-full h-12
    `}
`;

export default function ToggleTab({ isList, active, state }) {
    return (
        <ToggleStyle>
            <ToggleBody>
                <ToggleItem isList={ isList } active={ active } state={ state } />
            </ToggleBody>
        </ToggleStyle>
    );
}