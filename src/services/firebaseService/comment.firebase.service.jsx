import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';
import { db } from '../../firebase-config';

export const commentService = {
  deleteComment({ commentId }) {
    return deleteDoc(doc(db, 'comments', commentId));
  },
  //   deleteReply({ parentId, replyId, token }) {
  //     return axios.delete(`/api/comment/reply/${parentId}/${replyId}`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //   },
  //   getReply({ commentId }) {
  //     return axios.get(`/api/comment/reply/${commentId}`);
  //   },
  getComments({ postId }) {
    return getDocs(query(collection(db, 'comments'), where('postId', '==', postId)));
  },
  saveComment({ postId, userId, comment }) {
    return addDoc(collection(db, 'comments'), { postId, userId, comment, createDate: Date() });
  },
  // deleteAllComments({ postId }) {
  //   return deleteDoc(query(collection(db, 'comments'), where('postId', '==', postId)));
  // },
  //   saveReply({ parentId, content, token }) {
  //     return axios.post(
  //       `/api/comment/reply`,
  //       {
  //         parentId,
  //         content,
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       },
  //     );
  //   },
  updateComment({ commentId, comment }) {
    return updateDoc(doc(db, 'comments', commentId), { comment });
  },
  //   updateReply({ replyId, content, token }) {
  //     return axios.put(
  //       `/api/comment/reply`,
  //       { replyId, content },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       },
  //     );
  //   },
};
