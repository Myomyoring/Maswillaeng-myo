import UserBoardContents from '../components/user/UserBoardContents';
import UserProfile from '../components/user/containers/UserProfile.container';

import { styled } from 'styled-components';
import tw from 'twin.macro';

const UserPageStyle = styled.div`
  ${tw`
        grid
        mx-auto p-10
        text-center

        tablet:grid-cols-[1fr_2fr]
        mobile:grid-cols-1 gap-6
  `}
`;

export default function UserPage() {
  return (
    <UserPageStyle>
      <UserProfile />
      <UserBoardContents />
    </UserPageStyle>
  );
}
