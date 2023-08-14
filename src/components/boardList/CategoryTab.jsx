import React from 'react';
import { styled } from 'styled-components';
import tw from 'twin.macro';
import TabBody from './TabBody';
import TabItem from './TabItem';
import TabList from './TabList';
const ToggleStyle = styled.div`
  ${tw`
        w-full h-12
    `}
`;

export default function ToggleTab({ active, setTab }) {
  return (
    <ToggleStyle>
      <TabBody>
        <TabItem categoryList={TabList} active={active} setTab={setTab} />
      </TabBody>
    </ToggleStyle>
  );
}
