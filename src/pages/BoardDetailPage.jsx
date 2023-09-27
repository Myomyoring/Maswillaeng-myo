import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PostContent from 'react-quill';
import 'react-quill/dist/quill.bubble.css';

import { postService } from '../services/post.service';
import { useAuth } from '../context/ProvideAuthContext';
import LinkButton from '../components/common/LinkButton';
import PostFooter from '../components/boardDetail/PostFooter';
import PostHeader from '../components/boardDetail/PostHeader';
import WriteComment from '../components/comment/WriteComment';

import { styled } from 'styled-components';
import tw from 'twin.macro';
import CommentList from '../components/comment/CommentList';

const PostStyle = styled.div`
  ${tw`
        w-2/3 h-full
        m-auto py-10
    `}
`;

export default function BoardDetailPage() {
  const { postId } = useParams();
  const navigate = useNavigate();
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
      console.log(error.message);
      navigate(`/`, { replace: true });
    }
  };

  return (
    <PostStyle>
      <PostHeader {...post} />
      <PostContent value={post.content} readOnly={true} theme={'bubble'} />
      <PostFooter {...{ post, postId, getPost, nickname }} />
      <WriteComment {...{ postId, getPost }} />
      <CommentList {...{ comments, getPost }} />
      <LinkButton to={'/'}>목록으로</LinkButton>
    </PostStyle>
  );
}
