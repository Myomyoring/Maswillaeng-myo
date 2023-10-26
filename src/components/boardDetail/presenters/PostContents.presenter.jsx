import PostMain from 'react-quill';
import 'react-quill/dist/quill.bubble.css';

import BoardListButton from '../../common/LinkButton';
import CommentList from '../../comment/containers/CommentList.container';
import PostFooter from '../containers/PostFooter.container';
import PostHeader from '../PostHeader';
import WriteComment from '../../comment/containers/WriteComment.container';

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
    <>
      <PostHeader {...{ post, writer }} />
      <PostMain value={post.content} readOnly={true} theme={'bubble'} />
      <PostFooter {...{ id, post, postId, getPost, nickname, writer }} />
      <WriteComment {...{ id, postId, getComments }} />
      <CommentList {...{ postId, getComments, getReplies, comments, replies, commentCount }} />
      <BoardListButton to={'/'}>목록으로</BoardListButton>
    </>
  );
}
