import React from 'react';
import { styled } from 'styled-components';
import tw from 'twin.macro';
import CategoryTabBody from './CategoryTabBody';
import CategoryTabItem from './CategoryTabItem';
import Categories from '../common/Categories';
const ToggleStyle = styled.div`
  ${tw`
        w-full h-12
    `}
`;

export default function ToggleTab({ active, setTab }) {
  return (
    <ToggleStyle>
      <CategoryTabBody>
        <CategoryTabItem categories={Categories} active={active} setTab={setTab} />
      </CategoryTabBody>
    </ToggleStyle>
  );
}
