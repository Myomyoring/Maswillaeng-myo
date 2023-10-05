import PostMain from 'react-quill';
import 'react-quill/dist/quill.bubble.css';

import BoardListButton from '../../common/LinkButton';
import CommentList from '../../comment/containers/CommentList.container';
import PostFooter from '../containers/PostFooter.container';
import PostHeader from '../PostHeader';
import WriteComment from '../../comment/containers/WriteComment.container';

export default function PostContentsPresenter({ post, postId, getPost, commentCount, comments, nickname }) {
  return (
    <>
      <PostHeader {...post} />
      <PostMain value={post.content} readOnly={true} theme={'bubble'} />
      <PostFooter {...{ post, postId, getPost, nickname }} />
      <WriteComment {...{ postId, getPost }} />
      <CommentList {...{ commentCount, comments, getPost }} />
      <BoardListButton to={'/'}>목록으로</BoardListButton>
    </>
  );
}
