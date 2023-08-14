import React from 'react';
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';
import tw from 'twin.macro';

const BoardNav = styled.div`
  ${tw`
        w-full h-16
        flex justify-end items-center
    `}
`;
const PostWriteButton = styled.span`
  ${tw`
        my-3 px-5 py-3
        bg-point
        font-semibold text-sm 
    `}
  a {
    ${tw`
        text-white
    `}
  }
`;

export default function Buttons() {
  return (
    <BoardNav>
      <PostWriteButton>
        <Link to={'/boardwrite'}>글쓰기</Link>
      </PostWriteButton>
    </BoardNav>
  );
}
