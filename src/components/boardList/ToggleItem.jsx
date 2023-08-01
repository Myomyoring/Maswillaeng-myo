import React from 'react';
import { styled } from 'styled-components';
import tw from 'twin.macro';

const ActiveLi = styled.li`
    ${tw`
        w-1/4
        p-5
        font-bold
        text-center
        cursor-pointer
        border-point
        border-solid
        border-x-2 border-t-2 border-b-0
        rounded-md
    `}
`

const Li = styled.li`
    ${tw`
        w-1/4
        p-5
        text-center
        cursor-pointer
        border-point
        border-solid
        border-0
        border-b-2
    `}
`

export default function ToggleItem({ isList, active, state }) {

    return (
        <>
             {
             isList ? 
                isList.map((tab) => tab.id === active ? 
                <ActiveLi
                key={ tab.id }
                >
                    { tab.title }
                </ActiveLi>
                :
                <Li 
                key={ tab.id }
                onClick={ () => state(tab.id)}
                >
                    { tab.title }
                </Li>
                )
             : "탭 없음"

                }
        </>
    );
}