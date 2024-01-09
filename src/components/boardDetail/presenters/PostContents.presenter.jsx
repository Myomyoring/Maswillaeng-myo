import Post from 'react-quill';
import 'react-quill/dist/quill.bubble.css';

import BoardListLink from '../../common/LinkButton';
import CommentList from '../../comment/containers/CommentList.container';
import CommentWriter from '../../comment/containers/CommentWriter.container';
import PostFooter from '../containers/PostFooter.container';
import PostHeader from '../PostHeader';

import styled from 'styled-components';
import tw from 'twin.macro';

const PostContentsStyle = styled.div`
  ${tw`
      flex flex-col gap-4
  `}

  .ql-editor {
    ${tw`
          border-solid border-gray border-2
        bg-white

        desktop:min-h-[300px]
        tablet:min-h-[300px]
        mobile:min-h-[100px]
    `}
  }

  a:nth-child(6) {
    ${tw`
        self-end 
        font-[300]
        
        desktop:px-11
        tablet:px-8
        mobile:px-4
      `}
  }
`;

export default function PostContentsPresenter({
  id,
  writer,
  post,
  postId,
  getPost,
  getComments,
  getReplies,
  nickname,
  comments,
  replies,
  commentCount,
}) {
  return (
    <PostContentsStyle>
      <PostHeader {...{ post, writer }} />
      <Post value={post.content} readOnly={true} theme={'bubble'} />
      <PostFooter {...{ id, post, postId, getPost, nickname, writer }} />
      <CommentWriter {...{ id, postId, getComments }} />
      <CommentList {...{ postId, getComments, getReplies, comments, replies, commentCount }} />
      <BoardListLink to={'/'}>목록으로</BoardListLink>
    </PostContentsStyle>
  );
}
