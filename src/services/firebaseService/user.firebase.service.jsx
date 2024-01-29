import { collection, deleteDoc, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { authService, db } from '../../firebase-config';
import {
  deleteUser,
  reauthenticateWithCredential,
  signInWithEmailAndPassword,
  signOut,
  updatePassword,
} from 'firebase/auth';

export const userService = {
  deleteAccount() {
    return deleteUser(authService.currentUser);
  },
  deleteUser({ userId }) {
    return deleteDoc(doc(db, 'users', userId));
  },
  duplicateEmail({ email }) {
    return getDocs(query(collection(db, 'users'), where('email', '==', email)));
  },
  duplicateNickName({ nickname }) {
    return getDocs(query(collection(db, 'users'), where('nickname', '==', nickname)));
  },
  getUserById({ userId }) {
    return getDocs(query(collection(db, 'users'), where('userId', '==', userId)));
  },
  getUserByNickname({ nickname }) {
    return getDocs(query(collection(db, 'users'), where('nickname', '==', nickname)));
  },
  logIn({ email, password }) {
    return signInWithEmailAndPassword(authService, email, password);
  },
  logOut() {
    return signOut(authService);
  },
  updateUser({ userId, password, phoneNumber, nickname, userImage, introduction }) {
    return updateDoc(doc(db, 'users', userId), { userImage, password, nickname, phoneNumber, introduction });
  },
  updatePassword({ newPassword }) {
    return updatePassword(authService.currentUser, newPassword);
  },
  userCredential({ email, password }) {
    return reauthenticateWithCredential(
      authService.currentUser,
      authService.EmailAuthProvider.credential(email, password),
    );
  },
};
