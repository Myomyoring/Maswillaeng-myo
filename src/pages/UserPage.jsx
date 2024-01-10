import UserPostContents from '../components/user/UserBoardContents';
import UserProfile from '../components/user/containers/UserProfile.container';

import { styled } from 'styled-components';
import tw from 'twin.macro';

const UserPageStyle = styled.div`
  ${tw`
        grid grid-cols-[1fr_2fr]
        mx-auto p-10
        text-center
  `}
`;

export default function UserPage() {
  return (
    <UserPageStyle>
      <UserProfile />
      <UserPostContents />
    </UserPageStyle>
  );
}
