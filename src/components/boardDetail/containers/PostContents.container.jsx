import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useAuth } from '../../../context/ProvideAuthContext';
import PostContentsPresenter from '../presenters/PostContents.presenter';

export default function PostContentsContainer() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { nickname } = currentUser();

  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [commentCount, setCommentCount] = useState(0);

  useEffect(() => {
    getPost();
  }, [postId]);

  const getPost = async () => {
    try {
      const response = await postService.getPost({ postId });
      if (response.statusText === 'OK') {
        console.log(response.data);
        setPost(response.data);
        setComments(response.data.commentList);
        setCommentCount(response.data.commentCount);
      }
    } catch (error) {
      console.log(error.message);
      navigate(`/`, { replace: true });
    }
  };
  return <PostContentsPresenter {...{ post, postId, getPost, commentCount, comments, nickname }} />;
}
