import { useState } from 'react';

import { userCategories } from '../../constants';
import CategorySelector from '../common/CategorySelector';
import UserPosts from './containers/UserPosts.container';
import UserTab from '../common/CategoryTab';

import * as S from './styles/index';

export default function UserBoardContents() {
  const [tab, setTab] = useState(0);
  return (
    <S.UserBoardContentsStyle>
      <CategorySelector activeTabId={tab} categories={userCategories} setTab={setTab} />
      <UserTab activeTabId={tab} categories={userCategories} setTab={setTab} />
      <UserPosts active={tab} />
    </S.UserBoardContentsStyle>
  );
}
