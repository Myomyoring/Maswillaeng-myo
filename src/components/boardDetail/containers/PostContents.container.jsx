import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useAuth } from '../../../context/ProvideAuthContext';
import PostContentsPresenter from '../presenters/PostContents.presenter';
import { Navi } from '../../common/Navi';
import { commentService } from '../../../services/firebaseService/comment.firebase.service';
import { postService } from '../../../services/firebaseService/post.firebase.service';
import { userService } from '../../../services/firebaseService/user.firebase.service';

export default function PostContentsContainer() {
  const { postId, writer } = useParams();
  const { authNavi } = Navi();
  const { currentUser } = useAuth();
  const { id, nickname } = currentUser();

  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [replies, setReplies] = useState([]);
  const [commentCount, setCommentCount] = useState(0);

  useEffect(() => {
    getPost();
    getComments();
    getReplies();
  }, [postId]);

  const getPost = async () => {
    try {
      const response = await postService.getPost({ postId });
      if (response.exists()) {
        let data = response.data();
        setPost(response.data());
        const getNicknames = await userService.getUserById({ userId: data.userId });
        getNicknames.forEach((doc) => {
          let user = doc.data();
          setPost({ ...data, userImage: user.userImage });
        });
      }
    } catch (error) {
      console.log(error.code);
      authNavi(`/`);
    }
  };

  const getComments = async () => {
    try {
      const data = [];
      const response = await commentService.getComments({ postId });
      response.forEach((comment) => {
        data.push({ ...comment.data(), commentId: comment.id });
      });

      const updatedData = [];

      for (const item of data) {
        const getNicknames = await userService.getUserById({ userId: item.userId });
        getNicknames.forEach((doc) => {
          let user = doc.data();
          if (user.id === item.userId) {
            updatedData.push({ ...item, nickname: user.nickname, userImage: user.userImage });
          }
        });
      }
      setComments(updatedData);
      setCommentCount(updatedData.length);
    } catch (error) {
      console.log(error);
    }
  };

  const getReplies = async () => {
    try {
      const data = [];
      const response = await commentService.getReplies({ postId });
      response.forEach((reply) => {
        data.push({ ...reply.data(), commentId: reply.id });
      });

      const updatedData = [];

      for (const item of data) {
        const getNicknames = await userService.getUserById({ userId: item.userId });
        getNicknames.forEach((doc) => {
          let user = doc.data();
          if (user.id === item.userId) {
            updatedData.push({ ...item, nickname: user.nickname, userImage: user.userImage });
          }
        });
      }
      setReplies(updatedData);
      setCommentCount(updatedData.length + commentCount);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <PostContentsPresenter
      {...{ id, writer, post, postId, getPost, getReplies, getComments, nickname, comments, replies, commentCount }}
    />
  );
}
