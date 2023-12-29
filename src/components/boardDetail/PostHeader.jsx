import { Link } from 'react-router-dom';

import { DisplayFullDate } from '../../utils/display_date';
import DisplayMemberProfile from '../common/DisplayMemberProfile';

import styled from 'styled-components';
import tw from 'twin.macro';
import EmptyHeartIcon from '../../statics/svg/empty_heart_icon';

const PostHeaderStyle = styled.div`
  ${tw`
    flex flex-col gap-3
  `}
`;
const CategoryNameBox = styled.div`
  ${tw` 
      font-bold text-point
    `}
`;
const CategoryLink = styled(Link)`
  ${tw``}
`;
const PostTitleBox = styled.div`
  ${tw`
    flex justify-between items-center
  `}
`;
const PostTitleText = styled.span`
  ${tw`
      text-2xl font-black
  `}
`;
const LikeBox = styled.div`
  ${tw` 
      flex items-center
    `}
  svg {
    ${tw` mx-1 fill-point `}
  }
`;
const LikeCountText = styled.span`
  ${tw`
      text-xl text-point
    `}
`;

const ProfileBox = styled.div`
  ${tw`
      flex items-center
      font-bold text-xs text-darkgray
    `}
`;

const DateText = styled.span`
  ${tw`
    before:content-['|'] 
    before:mx-2
  `}
`;

export default function PostHeader({ post, writer }) {
  return (
    <PostHeaderStyle>
      <CategoryNameBox>
        <CategoryLink to={`/`}>{post.category}</CategoryLink>
      </CategoryNameBox>
      <PostTitleBox>
        <PostTitleText>{post.title}</PostTitleText>
        <LikeBox>
          <EmptyHeartIcon />
          <LikeCountText>{post.likeCnt}</LikeCountText>
        </LikeBox>
      </PostTitleBox>
      <ProfileBox>
        <DisplayMemberProfile userImage={post.userImage} nickname={writer} />
        <DateText>{DisplayFullDate(post.createDate)}</DateText>
      </ProfileBox>
    </PostHeaderStyle>
  );
}
