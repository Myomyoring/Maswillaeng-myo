import { useState } from 'react';
import UserBoardContents from '../components/user/UserBoardContents';
import UserProfile from '../components/user/containers/UserProfile.container';

import * as S from './styles/User.style';

export default function UserPage() {
  const [modal, setModal] = useState(false);
  return (
    <>
      <S.UserPageStyle>
        <UserProfile {...{ modal, setModal }} />
        {!modal ? <UserBoardContents /> : null}
      </S.UserPageStyle>
    </>
  );
}
