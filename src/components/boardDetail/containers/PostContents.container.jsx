import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { onSnapshot } from 'firebase/firestore';
import PostContent from 'react-quill';

import { postService } from '../../../services/firebaseService/post.firebase.service';
import { useAuth } from '../../../contexts/ProvideAuthContext';
import { useRouter } from '../../../hooks/useRouter';
import { userService } from '../../../services/firebaseService/user.firebase.service';

import 'react-quill/dist/quill.bubble.css';
import { commentService } from '../../../services/firebaseService/comment.firebase.service';
import { CONFIRM_MESSAGE } from '../../../constants';
import CommentList from '../../comment/containers/CommentList.container';
import CommentWriter from '../../comment/containers/CommentWriter.container';
import LoadingScreen from '../../common/LoadingScreen';
import PostContentsPresenter from '../presenters/PostContents.presenter';
import PostFooter from './PostFooter.container';
import PostHeader from '../containers/PostHeader.container';

export default function PostContentsContainer() {
  const { postId, writer } = useParams();
  const { authRouteTo } = useRouter();
  const { currentUser } = useAuth();
  const { userId, nickname } = currentUser();

  const [isLoading, setLoading] = useState(false);
  const [post, setPost] = useState({});
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [replies, setReplies] = useState([]);
  const [commentCount, setCommentCount] = useState(0);

  const getWriterInfo = async (userId) => {
    let writerInfoData = {};
    const userDoc = await userService.getUserById({ userId });
    userDoc.forEach((doc) => {
      const { userId, userImage, nickname } = doc.data();
      writerInfoData = { userId, userImage, nickname };
    });
    return writerInfoData;
  };

  const getPost = () => {
    setLoading(true);
    const postQuery = postService.getPostQuery({ postId });
    onSnapshot(postQuery, (snapshot) => {
      if (!snapshot.exists()) {
        authRouteTo('/404');
        return;
      }
      const { category, commentCount, content, createDate, likeCnt, title, userId } = snapshot.data();
      getWriterInfo(userId).then((info) => {
        setPost({ category, commentCount, content, createDate, likeCnt, title, userId, userImage: info.userImage });
        setCommentCount(commentCount);
      });
    });
    setLoading(false);
  };

  const getUpdateComments = async (initialComments) => {
    try {
      const updateData = [];
      for (let data of initialComments) {
        const writerInfoData = await getWriterInfo(data.userId);
        if (writerInfoData.userId === data.userId) {
          updateData.push({ ...data, nickname: writerInfoData.nickname, userImage: writerInfoData.userImage });
        }
      }
      return updateData;
    } catch (error) {
      console.log(error);
    }
  };

  const getComments = () => {
    const commentQuery = commentService.getComments({ postId });
    onSnapshot(commentQuery, (snapshot) => {
      const initialData = snapshot.docs.map((doc) => {
        const { comment, createDate, postId, userId } = doc.data();
        return { comment, createDate, postId, userId, commentId: doc.id };
      });
      getUpdateComments(initialData).then((data) => {
        setComments(data);
      });
    });
  };

  const getReplies = () => {
    const repliesQuery = commentService.getReplies({ postId });
    onSnapshot(repliesQuery, (snapshot) => {
      const initialData = snapshot.docs.map((doc) => {
        const { comment, createDate, postId, userId, parentId } = doc.data();
        return { comment, createDate, postId, userId, parentId, commentId: doc.id };
      });
      getUpdateComments(initialData).then((data) => {
        setReplies(data);
      });
    });
  };

  const onSaveComment = async () => {
    if (comment === '') {
      alert(CONFIRM_MESSAGE.COMMENT_EMPTY_ERROR);
      return;
    }
    try {
      setLoading(true);
      await commentService.saveComment({ postId, userId, comment });
      await commentService.updateCommentCount({ postId, commentCount: commentCount + 1 });
      setComment('');
    } catch (error) {
      console.log(error.code);
    } finally {
      setLoading(false);
    }
  };

  const onDeleteComment = async (commentId) => {
    if (window.confirm(CONFIRM_MESSAGE.COMMENT_DELETE_CONFIRM_MESSAGE)) {
      try {
        await commentService.deleteComment({ commentId });
        await commentService.updateCommentCount({ postId, commentCount: commentCount - 1 });
      } catch (error) {
        console.log(error.code);
      }
    }
  };

  useEffect(() => {
    getPost();
    getComments();
    getReplies();
  }, [postId]);

  return (
    <PostContentsPresenter>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <>
          <PostHeader {...{ post }} />
          <PostContent value={post.content} readOnly={true} theme={'bubble'} />
          <PostFooter {...{ postId, nickname, writer }} />
          <CommentWriter {...{ onSaveComment, comment, setComment, isLoading }} />
          <CommentList {...{ commentCount, comments, replies, onDeleteComment }} />
        </>
      )}
    </PostContentsPresenter>
  );
}
