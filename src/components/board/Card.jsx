import { Link } from 'react-router-dom';

import { BOARD_GUIDE } from '../../constants';
import { DisplayPostDate } from '../../utils/display_date';

import { styled } from 'styled-components';
import tw from 'twin.macro';
import DefaultThumbnail from '../../statics/images/default_thumbnail.png';
import LikeIcon from '../../statics/svg/full_heart_icon';

const CardStyle = styled.div`
  ${tw`
      m-auto
    `}
`;

const CardLayout = styled.span`
  ${tw`
      grid grid-cols-4
      text-center
    `}
`;

const CardContents = styled.div`
  ${tw`
      p-2  
      text-sm
    `}

  a {
    ${tw`
        grid
        font-bold
      `}

    &:hover {
      ${tw`underline`}
    }

    img {
      ${tw`
          w-full h-52
          my-2
          col-span-4
          rounded-lg
          border-solid
          object-cover
        `}
    }

    div {
      ${tw`
          col-span-4
          text-ellipsis overflow-hidden whitespace-nowrap
        `}
    }

    span {
      ${tw`
          text-xxs text-point
        `}
    }
  }
`;

const Content = styled.div`
  ${tw`
        p-2
        grid grid-cols-3
        text-sm text-ellipsis
        overflow-hidden
        whitespace-nowrap 
    `}
`;

const NothingMessage = styled.div`
  ${tw`
      p-10
      col-span-4
      text-lg
    `}
`;

export default function Card({ posts }) {
  return (
    <CardStyle>
      <CardLayout>
        {posts?.length !== 0 ? (
          posts?.map((post, index) => (
            <CardContents key={index}>
              <Link to={`/board/${post.id}/${post.nickname}`}>
                <img src={post.thumbnail ? post.thumbnail : DefaultThumbnail} />
                <div>{post.title}</div>
                <span>[{post.commentCount}]</span>
              </Link>
              <Content>
                <Link to={`/user/${post.nickname}`}>{post.nickname}</Link>
                <span>{DisplayPostDate(post.createDate)}</span>
                <span>
                  <LikeIcon />
                  <span> {post.likeCnt}</span>
                </span>
              </Content>
            </CardContents>
          ))
        ) : (
          <NothingMessage>{BOARD_GUIDE}</NothingMessage>
        )}
      </CardLayout>
    </CardStyle>
  );
}
