import { Link } from 'react-router-dom';

import styled from 'styled-components';
import tw from 'twin.macro';

const DisplayMemberProfileStyle = styled.div`
  ${tw``}
`;

const UserPageLink = styled(Link)`
  ${tw`
    flex items-center gap-2
  `}
`;

const UserImage = styled.img`
  ${tw`
      w-10 h-10
      border-solid border-gray border-2
      rounded-full
  `}
`;

const UserNickNameText = styled.span`
  ${tw``}
`;

export default function DisplayMemberProfile({ userImage, nickname }) {
  return (
    <DisplayMemberProfileStyle>
      <UserPageLink to={`/user/${nickname}`}>
        <UserImage src={userImage} />
        <UserNickNameText>{nickname}</UserNickNameText>
      </UserPageLink>
    </DisplayMemberProfileStyle>
  );
}
