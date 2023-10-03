import { useState } from 'react';

import { userCategories } from '../../constants';
import UserContents from './UserContents';
import UserTab from '../common/CategoryTab';

import tw from 'twin.macro';
import { styled } from 'styled-components';

const ContentsStyle = styled.div`
  ${tw`
        w-2/3 h-screen
        // mx-2.5
        // flex justify-center items-center
`}
`;

export default function UserBoardContents() {
  const [tab, setTab] = useState(0);
  return (
    <ContentsStyle>
      <UserTab active={tab} categories={userCategories} setTab={setTab} />
      <UserContents active={tab} />
    </ContentsStyle>
  );
}
