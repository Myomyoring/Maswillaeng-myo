import {
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';
import { db } from '../../firebase-config';

export const likeService = {
  createLikeDoc({ postId }) {
    return setDoc(doc(db, 'likes', postId), { postId, likeUsers: [] });
  },
  getLikes({ postId }) {
    return getDocs(query(collection(db, 'likes'), where('postId', '==', postId)));
  },
  getUserLikes({ userId }) {
    return getDocs(query(collection(db, 'likes'), where('likeUsers', 'array-contains', userId)));
  },
  saveLike({ postId, userId }) {
    return updateDoc(doc(db, 'likes', postId), { postId, likeUsers: arrayUnion(userId) });
  },
  deleteLike({ postId, userId }) {
    return updateDoc(doc(db, 'likes', postId), { postId, likeUsers: arrayRemove(userId) });
  },
  addLike({ postId, likeCnt }) {
    return updateDoc(doc(db, 'posts', postId), { likeCnt: likeCnt + 1 });
  },
  removeLike({ postId, likeCnt }) {
    return updateDoc(doc(db, 'posts', postId), { likeCnt: likeCnt - 1 });
  },
  deleteAllLikes({ postId }) {
    return deleteDoc(doc(db, 'likes', postId));
  },
};
