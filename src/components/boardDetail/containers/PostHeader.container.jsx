import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { onSnapshot } from 'firebase/firestore';

import { likeService } from '../../../services/firebaseService/like.firebase.service';
import { useAuth } from '../../../contexts/ProvideAuthContext';

import PostHeaderPresenter from '../presenters/PostHeader.present';

export default function PostHeaderContainer({ post }) {
  const { postId, writer } = useParams();
  const { currentUser } = useAuth();
  const { userId } = currentUser();
  const [like, setLike] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  useEffect(() => {
    if (!postId) return;
    likeState();
  }, [postId]);

  const likeState = () => {
    const likeQuery = likeService.getLikes({ postId });
    onSnapshot(likeQuery, (snapshot) => {
      snapshot.docs.map((doc) => {
        const { likeUsers } = doc.data();
        setLikeCount(likeUsers.length);
        setLike(likeUsers.some((id) => id === userId) ? true : false);
      });
    });
  };

  const onLike = async () => {
    try {
      if (like) {
        await likeService.deleteLike({ postId, userId });
        await likeService.updateLike({ postId, likeCnt: likeCount - 1 });
      } else {
        await likeService.saveLike({ postId, userId });
        await likeService.updateLike({ postId, likeCnt: likeCount + 1 });
      }
    } catch (error) {
      console.log(error);
    } finally {
      likeState();
    }
  };
  return <PostHeaderPresenter {...{ post, writer, onLike, like }} />;
}
