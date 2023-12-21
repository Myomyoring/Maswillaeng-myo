import { arrayRemove, arrayUnion, collection, doc, getDocs, query, setDoc, updateDoc, where } from 'firebase/firestore';
import { db } from '../../firebase-config';

export const followService = {
  createFollowerDoc({ memberId }) {
    return setDoc(doc(db, 'followers', memberId), { userId: memberId, followerUsers: [] });
  },
  createFollowingDoc({ userId }) {
    return setDoc(doc(db, 'followings', userId), { userId, followingUsers: [] });
  },
  getFollowers({ userId }) {
    return getDocs(query(collection(db, 'followers'), where('userId', '==', userId)));
  },
  getFollowings({ userId }) {
    return getDocs(query(collection(db, 'followings'), where('userId', '==', userId)));
  },
  saveFollower({ memberId, userId }) {
    return updateDoc(doc(db, 'followers', memberId), { userId: memberId, followerUsers: arrayUnion(userId) });
  },
  saveFollowing({ memberId, userId }) {
    return updateDoc(doc(db, 'followings', userId), { userId, followingUsers: arrayUnion(memberId) });
  },
  updateFollowingAddCount({ userId, count }) {
    return updateDoc(doc(db, 'users', userId), { followingCnt: count });
  },
  updateFollowerAddCount({ memberId, count }) {
    return updateDoc(doc(db, 'users', memberId), { followerCnt: count + 1 });
  },
  removeFollower({ memberId, userId }) {
    return updateDoc(doc(db, 'followers', memberId), { userId: memberId, followerUsers: arrayRemove(userId) });
  },
  removeFollowing({ memberId, userId }) {
    return updateDoc(doc(db, 'followings', userId), { userId, followingUsers: arrayRemove(memberId) });
  },
  updateFollowingDeleteCount({ userId, count }) {
    return updateDoc(doc(db, 'users', userId), { followingCnt: count });
  },
  updateFollowerDeleteCount({ memberId, count }) {
    return updateDoc(doc(db, 'users', memberId), { followerCnt: count - 1 });
  },
};
