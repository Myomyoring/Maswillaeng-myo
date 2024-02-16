import { authService, db } from '../firebase-config';
import {
  EmailAuthProvider,
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  reauthenticateWithCredential,
  setPersistence,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { encryptPassword } from '../utils/password_encoder';
import { followService } from '../services/firebaseService/follow.firebase.service';
import { userService } from '../services/firebaseService/user.firebase.service';

const EXPIRE_TIME = 1000 * 60 * 60 * 24 * 15; // 15일

export default function FirebaseAuthUser() {
  const signUp = async ({ email, password }) => {
    try {
      const response = await createUserWithEmailAndPassword(authService, email, password);
      if (response.user) {
        return { ok: true, id: response.user.uid };
      }
    } catch (error) {
      console.log(error);
    }
  };

  const setUserInfo = async ({ userId, userImage, email, password, nickname, phoneNumber, introduction }) => {
    const encryptPw = encryptPassword(password);
    try {
      await setDoc(doc(db, 'users', userId), {
        userId: userId,
        userImage: userImage,
        email,
        password: encryptPw,
        nickname,
        phoneNumber,
        introduction,
        followerCnt: 0,
        followingCnt: 0,
      });
      await followService.createFollowerDoc({ memberId: userId });
      await followService.createFollowingDoc({ userId: userId });
    } catch (error) {
      console.log(error);
    }
  };

  const setUser = async (userId) => {
    if (!userId) return;
    try {
      const userSnap = await userService.getUserById({ userId });
      userSnap.forEach((doc) => {
        const data = doc.data();
        const currentUser = {
          email: data.email,
          userId: userId,
          nickname: data.nickname,
          follower: data.followerCnt,
          following: data.followingCnt,
          introduction: data.introduction,
          userImage: data.userImage,
        };
        localStorage.setItem('current_user', JSON.stringify(currentUser));
      });
    } catch (error) {
      console.log(error);
    }
  };

  const logIn = async (email, password) => {
    await setPersistence(authService, browserLocalPersistence);
    const response = await userService.logIn({ email, password });
    if (response.user) {
      await setUser(response.user.uid);
      localStorage.setItem('access_token', response.user.accessToken);
      localStorage.setItem('refresh_token', response.user.refreshToken);
      setExpire(EXPIRE_TIME);
      return 'success';
    }
  };

  const logOut = async () => {
    const user = JSON.parse(localStorage.getItem('current_user'));
    await userService.logOut();

    if (user) {
      try {
        window.location.replace('/login');
      } catch (error) {
        console.log(error.message);
      }
    }
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('current_user');
    localStorage.removeItem('expiration');
  };

  const setExpire = (expireTime) => {
    const currentTime = new Date();
    let expire = {
      current: currentTime.getTime(),
      expiration: expireTime,
    };
    localStorage.setItem('expiration', JSON.stringify(expire));
  };

  const logoutTimer = () => {
    const getTime = JSON.parse(localStorage.getItem('expiration'));
    if (!getTime) return;

    const now = new Date();
    const current = getTime.current;
    const expiration = getTime.expiration;

    const limitTime = Math.floor(now.getTime() - current);

    if (limitTime > expiration) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('current_user');
      localStorage.removeItem('expiration');
      userService.logOut();
    }
  };

  const currentUser = () => {
    const current = JSON.parse(localStorage.getItem('current_user'));
    return current ?? null;
  };

  const userCredential = async (password) => {
    const user = authService.currentUser;
    const authCredential = EmailAuthProvider.credential(user.email, password);

    let result = false;
    await reauthenticateWithCredential(user, authCredential)
      .then(() => {
        result = true;
      })
      .catch((error) => {
        console.log(error);
        result = false;
      });
    return result;
  };

  return { logIn, logOut, signUp, currentUser, setUserInfo, userCredential, logoutTimer };
}
