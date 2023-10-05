import UserPostContents from '../components/user/UserBoardContents';
import UserProfile from '../components/user/UserProfile';

import { styled } from 'styled-components';
import tw from 'twin.macro';

const UserPageStyle = styled.div`
  ${tw`
      w-full h-screen
      px-2.5 py-10
      flex justify-center items-center
      overflow-hidden
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
