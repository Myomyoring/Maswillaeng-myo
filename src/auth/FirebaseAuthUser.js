import { authService, db } from '../firebase-config';
import { browserLocalPersistence, createUserWithEmailAndPassword, setPersistence } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { encryptPassword } from '../utils/password_encoder';
import { userService } from '../services/firebaseService/user.firebase.service';

const EXPIRE_TIME = 1000 * 60 * 60 * 24 * 15; // 15일

export default function FirebaseAuthUser() {
  const signUp = async ({ userImage, email, password, nickname, phoneNumber, introduction }) => {
    try {
      const response = await createUserWithEmailAndPassword(authService, email, password);
      if (response.user) {
        const encryptPw = encryptPassword(password);
        await setDoc(doc(db, 'users', response.user.uid), {
          id: response.user.uid,
          userImage,
          email,
          password: encryptPw,
          nickname,
          phoneNumber,
          introduction,
          followerCnt: 0,
          followingCnt: 0,
        });
        return 'success';
      }
    } catch (error) {
      console.log(error.code);
    }
  };

  const setUser = async (userId) => {
    if (!userId) return;
    try {
      const userSnap = await userService.getUserById({ userId });
      userSnap.forEach((doc) => {
        const data = doc.data();
        let currentUser = {
          email: data.email,
          id: userId,
          nickname: data.nickname,
          follower: data.followerCnt,
          following: data.followingCnt,
          introduction: data.introduction,
          userImage: data.userImage,
        };
        localStorage.setItem('current_user', JSON.stringify(currentUser));
      });
    } catch (error) {
      console.log(error.message);
      return false;
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
      return true;
    } else return false;
  };

  const currentUser = () => {
    const current = JSON.parse(localStorage.getItem('current_user'));
    return current ?? false;
  };

  return { logIn, logOut, signUp, currentUser };
}
