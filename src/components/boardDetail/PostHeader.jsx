import { Link } from 'react-router-dom';

import { diplayBoardDetailDate } from '../../utils/display_date';

import styled from 'styled-components';
import tw from 'twin.macro';

const PostHeaderStyle = styled.div`
  ${tw`
      mt-10 mb-2
  `}
`;
const Category = styled.h3`
  a {
    ${tw`
        my-3
        font-bold text-point
    `}
  }
`;
const Title = styled.div`
  ${tw`
        mb-5 text-2xl font-black
    `}
`;

const ProfileBox = styled.div`
  ${tw`
      flex items-center
    `}
  * {
    ${tw`mr-2`}
  }
  img {
    ${tw`
      w-10 h-10
      border-solid border-gray
      rounded-full object-cover
    `}
  }
  span {
    ${tw`
        font-bold text-xs text-darkgray
    `}
  }
`;

export default function PostHeader({ category, title, userImage, nickname, createdDate }) {
  return (
    <PostHeaderStyle>
      <Category>
        <Link to={`/`}>{category}</Link>
      </Category>
      <Title>{title}</Title>
      <ProfileBox>
        <img src={userImage} />
        <Link to={`/user/${nickname}`}>{nickname}</Link>
        <span>{diplayBoardDetailDate(createdDate)}</span>
      </ProfileBox>
    </PostHeaderStyle>
  );
}
