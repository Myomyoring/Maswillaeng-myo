import { Link } from 'react-router-dom';

import styled from 'styled-components';
import tw from 'twin.macro';

const UserImage = styled.img`
  ${tw`
      w-10 h-10
      mr-2
      border-solid border-gray
      rounded-full object-cover
  `}
`;

const UserPageLink = styled(Link)`
  ${tw`
      flex items-center
      mr-2
    `}
`;
export default function DisplayMemberProfile({ userImage, nickname }) {
  return (
    <>
      <UserPageLink to={`/user/${nickname}`}>
        <UserImage src={userImage} />
        <span>{nickname}</span>
      </UserPageLink>
    </>
  );
}
