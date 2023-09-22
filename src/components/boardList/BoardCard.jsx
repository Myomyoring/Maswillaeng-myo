import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';
import tw from 'twin.macro';
import { displayCreatedAt } from '../../utils/display_date';
import DefaultThumbnail from '../../statics/images/default_thumbnail.png';

const TabBoardStyle = styled.div`
  ${tw`
      m-auto
    `}
`;

const Card = styled.span`
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
          col-span-3
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
        grid grid-cols-4
        text-xxs text-ellipsis
        overflow-hidden
        whitespace-nowrap 
    `}
`;

const HashTag = styled.div`
  ${tw`
        col-span-4
        rounded-md text-xs overflow-hidden whitespace-nowrap text-ellipsis
    `}
`;

const NothingMessage = styled.div`
  ${tw`
      p-10
      col-span-4
      text-lg
  `}
`;

export default function TabBoard({ posts, guide }) {
  const [loading, setLoading] = useState(false);
  return (
    <TabBoardStyle>
      <Card>
        {posts?.length !== 0 ? (
          posts?.map((post) => (
            <CardContents key={post.id}>
              <Link to={`/board/${post.id}`}>
                <img src={post.thumbnail ? post.thumbnail : DefaultThumbnail} />
                <div>{post.title}</div>
                <span>[-]</span>
              </Link>
              <Content>
                <Link to={`/user/${post.nickname}`}>{post.nickname}</Link>
                <span>{displayCreatedAt(post.createdDate)}</span>
                <span>👀 -</span>
                <span>💗 -</span>
                <HashTag>해시태그</HashTag>
              </Content>
            </CardContents>
          ))
        ) : (
          <NothingMessage>{guide}</NothingMessage>
        )}
      </Card>
    </TabBoardStyle>
  );
}
