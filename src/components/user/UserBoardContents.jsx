import { useState } from 'react';

import { userCategories } from '../../constants';
import CategorySelector from '../common/CategorySelector';
import UserPosts from './containers/UserPosts.container';
import UserTab from '../common/CategoryTab';

import tw from 'twin.macro';
import { styled } from 'styled-components';

const UserBoardContentsStyle = styled.div`
  ${tw`
      flex flex-col gap-11
  `}
`;

export default function UserBoardContents() {
  const [tab, setTab] = useState(0);
  return (
    <UserBoardContentsStyle>
      <CategorySelector active={tab} categories={userCategories} setTab={setTab} />
      <UserTab active={tab} categories={userCategories} setTab={setTab} />
      <UserPosts active={tab} />
    </UserBoardContentsStyle>
  );
}
