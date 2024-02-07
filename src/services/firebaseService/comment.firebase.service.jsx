import { addDoc, collection, deleteDoc, doc, getDocs, orderBy, query, updateDoc, where } from 'firebase/firestore';
import { db } from '../../firebase-config';

export const commentService = {
  deleteComment({ commentId }) {
    return deleteDoc(doc(db, 'comments', commentId));
  },
  deleteReply({ commentId }) {
    return deleteDoc(doc(db, 'replies', commentId));
  },
  getComments({ postId }) {
    return getDocs(query(collection(db, 'comments'), where('postId', '==', postId), orderBy('createDate', 'desc')));
  },
  getReplies({ postId }) {
    return getDocs(query(collection(db, 'replies'), where('postId', '==', postId), orderBy('createDate', 'desc')));
  },
  saveComment({ postId, userId, comment }) {
    return addDoc(collection(db, 'comments'), { postId, userId, comment, createDate: Date() });
  },
  getAllUserComments({ userId }) {
    return getDocs(query(collection(db, 'comments'), where('userId', '==', userId), orderBy('createDate', 'desc')));
  },
  getAllUserReplies({ userId }) {
    return getDocs(query(collection(db, 'replies'), where('userId', '==', userId), orderBy('createDate', 'desc')));
  },
  saveReply({ parentId, postId, userId, comment }) {
    return addDoc(collection(db, 'replies'), { parentId, postId, userId, comment, createDate: Date() });
  },
  updateComment({ commentId, comment }) {
    return updateDoc(doc(db, 'comments', commentId), { comment });
  },
  updateReply({ commentId, comment }) {
    return updateDoc(doc(db, 'replies', commentId), { comment });
  },
};
