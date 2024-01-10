import { Link } from 'react-router-dom';

import { DisplayPostDate } from '../../utils/display_date';

import { styled } from 'styled-components';
import tw from 'twin.macro';
import DefaultThumbnail from '../../statics/images/default_thumbnail.png';
import LikeIcon from '../../statics/svg/small_full_heart_icon';

const CardStyle = styled.div`
  ${tw``}
`;

const CardLayout = styled.span`
  ${tw`
      grid text-center
      
      desktop:grid-cols-4
      tablet:grid-cols-3
      mobile:grid-cols-2
  `}
  ${(props) =>
    props.className === 'small'
      ? tw`desktop:grid-cols-3
      tablet:grid-cols-2
      mobile:grid-cols-1
      `
      : tw`desktop:grid-cols-4
      tablet:grid-cols-3
      mobile:grid-cols-2`}
`;

const CardContents = styled.div`
  ${tw`
      min-w-[180px]
      p-2
    `}

  a {
    &:hover {
      ${tw`underline`}
    }
  }
`;

const TitleLink = styled(Link)`
  ${tw`
      font-bold
      grid
    `}
`;

const Thumbnail = styled.img`
  ${tw`
        w-full min-w-[100px]
        col-span-4
        border-solid
        border-[1px]
        rounded-lg
        object-cover

        desktop:h-[260px]
        tablet:h-[220px]
        mobile:h-[140px]
  `}
`;

const Title = styled.div`
  ${tw`
        col-span-3
        mt-3
        text-ellipsis overflow-hidden whitespace-nowrap
  `}
`;

const CommentCount = styled.span`
  ${tw`
      flex justify-center items-center
      mt-3
      text-xs text-point
  `}
`;

const Footer = styled.div`
  ${tw`
        p-2
        grid grid-cols-5
        text-ellipsis
        overflow-hidden
        whitespace-nowrap
        desktop:text-sm 
        tablet:text-xs
        mobile:text-xs
    `}
`;

const Nickname = styled(Link)`
  ${tw``}
`;
const Date = styled.span`
  ${tw`
      col-span-3
      
  `}
`;
const Like = styled.span`
  ${tw`
    flex justify-center items-center
    gap-1
  `}
`;
const LikeCount = styled.span`
  ${tw``}
`;

const NothingMessage = styled.div`
  ${tw`
      p-10
      col-span-4
      text-lg
    `}
`;

export default function Card({ posts, guide, small }) {
  return (
    <CardStyle>
      <CardLayout className={small ? 'small' : ''}>
        {posts?.length !== 0 ? (
          posts?.map((post, index) => (
            <CardContents key={index}>
              <TitleLink to={`/board/${post.id}/${post.nickname}`}>
                <Thumbnail src={post.thumbnail ? post.thumbnail : DefaultThumbnail} />
                <Title>{post.title}</Title>
                <CommentCount>[{post.commentCount}]</CommentCount>
              </TitleLink>
              <Footer>
                <Nickname to={`/user/${post.nickname}`}>{post.nickname}</Nickname>
                <Date>{DisplayPostDate(post.createDate)}</Date>
                <Like>
                  <LikeIcon />
                  <LikeCount>{post.likeCnt}</LikeCount>
                </Like>
              </Footer>
            </CardContents>
          ))
        ) : (
          <NothingMessage>{guide}</NothingMessage>
        )}
      </CardLayout>
    </CardStyle>
  );
}
