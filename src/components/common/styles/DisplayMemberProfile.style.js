import { Link } from 'react-router-dom';

import styled from 'styled-components';
import tw from 'twin.macro';

export const DisplayMemberProfileStyle = styled.div`
  ${tw``}
`;

export const UserPageLink = styled(Link)`
  ${tw`
    flex items-center gap-2
  `}
`;

export const UserImage = styled.img`
  ${tw`
      w-10 h-10
      border-solid border-gray border-2
      rounded-full
  `}
`;

export const UserNickNameText = styled.span`
  ${tw``}
`;
