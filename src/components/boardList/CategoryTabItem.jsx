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
`;

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
`;

export default function ToggleItem({ categories, active, setTab }) {
  return (
    <>
      {categories
        ? categories.map((category) =>
            category.id === active ? (
              <ActiveLi key={category.id}>{category.title}</ActiveLi>
            ) : (
              <Li key={category.id} onClick={() => setTab(category.id)}>
                {category.title}
              </Li>
            ),
          )
        : '탭 에러'}
    </>
  );
}
