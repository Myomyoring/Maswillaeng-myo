import CommentList from './CommentList';

import styled from 'styled-components';
import tw from 'twin.macro';

const Count = styled.div`
  ${tw`
    py-5 
    font-semibold text-lg
  `}

  span {
    ${tw`
      font-bold text-point
    `}
  }
`;

const Comments = styled.div`
  ${tw`
    bg-white
  `}
`;

export default function CommentContainer({ comments, getPost }) {
  return (
    <>
      <Count>
        댓글 <span>{comments.length}</span>
      </Count>
      <Comments>
        <CommentList comments={comments} getPost={getPost} />
      </Comments>
    </>
  );
}
