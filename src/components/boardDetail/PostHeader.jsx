import { Link } from 'react-router-dom';

import { DisplayFullDate } from '../../utils/display_date';
import DisplayMemberProfile from '../common/DisplayMemberProfile';

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
  span {
    ${tw`
        font-bold text-xs text-darkgray
      `}
  }
`;

export default function PostHeader({ post, writer }) {
  return (
    <PostHeaderStyle>
      <Category>
        <Link to={`/`}>{post.category}</Link>
      </Category>
      <Title>{post.title}</Title>
      <ProfileBox>
        <DisplayMemberProfile userImage={post.userImage} nickname={writer} />
        <span>{DisplayFullDate(post.createDate)}</span>
      </ProfileBox>
    </PostHeaderStyle>
  );
}
