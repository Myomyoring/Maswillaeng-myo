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
    return query(collection(db, 'comments'), where('postId', '==', postId), orderBy('createDate', 'asc'));
  },
  getReplies({ postId }) {
    return query(collection(db, 'replies'), where('postId', '==', postId), orderBy('createDate', 'asc'));
  },
  saveComment({ postId, userId, comment }) {
    return addDoc(collection(db, 'comments'), { postId, userId, comment, createDate: Date() });
  },
  getAllUserComments({ userId }) {
    return query(collection(db, 'comments'), where('userId', '==', userId), orderBy('createDate', 'desc'));
  },
  getAllUserReplies({ userId }) {
    return query(collection(db, 'replies'), where('userId', '==', userId), orderBy('createDate', 'desc'));
  },
  saveReply({ parentId, postId, userId, comment }) {
    return addDoc(collection(db, 'replies'), { parentId, postId, userId, comment, createDate: Date() });
  },
  updateComment({ commentId, comment }) {
    return updateDoc(doc(db, 'comments', commentId), { comment });
  },
  updateCommentCount({ postId, commentCount }) {
    return updateDoc(doc(db, 'posts', postId), { commentCount: commentCount });
  },
  updateReply({ commentId, comment }) {
    return updateDoc(doc(db, 'replies', commentId), { comment });
  },
};
