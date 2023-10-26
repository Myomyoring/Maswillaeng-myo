import { collection, getDocs, query, where } from 'firebase/firestore';
import { authService, db } from '../../firebase-config';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';

export const userService = {
  //   deleteUser({ token }) {
  //     return axios.delete(`/api/user`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //   },
  duplicateEmail({ email }) {
    return getDocs(query(collection(db, 'users'), where('email', '==', email)));
  },
  duplicateNickName({ nickname }) {
    return getDocs(query(collection(db, 'users'), where('nickname', '==', nickname)));
  },
  //   duplicatePassword({ userId, password, token }) {
  //     return axios.post(
  //       '/api/auth/password',
  //       {
  //         userId,
  //         password,
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       },
  //     );
  //   },
  getUserById({ userId }) {
    return getDocs(query(collection(db, 'users'), where('id', '==', userId)));
  },
  //   getUserByNickname({ nickname }) {
  //     return axios.get(`/api/user/nickname?nickname=${nickname}`);
  //   },
  logIn({ email, password }) {
    return signInWithEmailAndPassword(authService, email, password);
  },
  logOut() {
    return signOut(authService);
  },
  //   refresh({ refreshToken }) {
  //     return axios.post('/api/auth/issue', { refreshToken });
  //   },
  //   updateUser({ password, phoneNumber, nickname, userImage, introduction, token }) {
  //     return axios.put(
  //       `/api/user`,
  //       {
  //         password,
  //         phoneNumber,
  //         nickname,
  //         userImage,
  //         introduction,
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       },
  //     );
  //   },
};
