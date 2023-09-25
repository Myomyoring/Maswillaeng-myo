import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PostContent from 'react-quill';
import 'react-quill/dist/quill.bubble.css';

import { postService } from '../services/post.service';
import CommentContainer from '../components/comment/CommentContainer';
import LinkButton from '../components/common/LinkButton';
import PostBottom from '../components/boardDetail/PostBottom';
import PostTitle from '../components/boardDetail/PostTitle';
import WriteComment from '../components/comment/WriteComment';

import { styled } from 'styled-components';
import tw from 'twin.macro';
import { useAuth } from '../context/ProvideAuthContext';

const PostStyle = styled.div`
  ${tw`
        w-2/3 h-full
        m-auto py-10
    `}
`;

export default function BoardDetailPage() {
  const { postId } = useParams();
  const { currentUser } = useAuth();
  const { nickname } = currentUser();
  // 서버 데이터를 useState로 관리하는게 맞는 것인가
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getPost();
  }, [postId]);

  const getPost = async () => {
    try {
      const response = await postService.getPost({ postId });
      if (response.statusText === 'OK') {
        setPost(response.data);
        setComments(response.data.commentList);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <PostStyle>
      <PostTitle post={post} />
      <PostContent value={post.content} readOnly={true} theme={'bubble'} />
      <PostBottom post={post} postId={postId} getPost={getPost} visitor={nickname} />
      <WriteComment postId={postId} getPost={getPost} />
      <CommentContainer comments={comments} getPost={getPost} visitor={nickname} />
      <LinkButton to={'/'}>목록으로</LinkButton>
    </PostStyle>
  );
}
