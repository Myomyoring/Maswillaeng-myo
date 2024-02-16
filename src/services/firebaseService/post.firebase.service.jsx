import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { db } from '../../firebase-config';

export const postService = {
  deletePost({ postId }) {
    return deleteDoc(doc(db, 'posts', postId));
  },
  getAllPost() {
    return getDocs(query(collection(db, 'posts'), orderBy('createDate', 'desc')));
  },
  getSelectedTabPost({ tabName }) {
    return getDocs(query(collection(db, 'posts'), where('category', '==', tabName), orderBy('createDate', 'desc')));
  },
  getPostQuery({ postId }) {
    return query(doc(db, 'posts', postId));
  },
  getPost({ postId }) {
    return getDoc(query(doc(db, 'posts', postId)));
  },
  getUserWritePost({ userId }) {
    return query(collection(db, 'posts'), where('userId', '==', userId), orderBy('createDate', 'desc'));
  },
  savePost({ userId, category, title, thumbnail, content }) {
    return addDoc(collection(db, 'posts'), {
      userId,
      title,
      category,
      thumbnail,
      content,
      createDate: Date(),
      likeCnt: 0,
      commentCount: 0,
    });
  },
  updatePost({ postId, userId, title, category, thumbnail, content, createDate }) {
    return updateDoc(doc(db, 'posts', postId), { userId, title, category, thumbnail, content, createDate });
  },
};
