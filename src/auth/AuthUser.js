import { userService } from '../services/serverService/user.service.jsx';

export default function AuthUser() {
  const setUser = async (userId) => {
    if (!userId) return;
    try {
      const { data } = await userService.getUserById({ userId });
      if (!data) return;

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

      return !!data;
    } catch (error) {
      console.log(error.message);
      return false;
    }
  };

  const setExpire = (expireTime) => {
    const currentTime = new Date();
    let expire = {
      current: currentTime.getTime(),
      expiration: expireTime,
    };
    localStorage.setItem('expiration', JSON.stringify(expire));
  };

  const logIn = async (email, password) => {
    try {
      const response = await userService.logIn({ email, password });
      if (response.statusText === 'OK') {
        const user = await setUser(response.data.userId);
        if (!user) return;
        localStorage.setItem('access_token', response.data.accessToken);
        localStorage.setItem('refresh_token', response.data.refreshToken);
        setExpire(response.data.expires_in);

        return !!user;
      }
    } catch (error) {
      console.log(error.message);
      return false;
    }
  };

  const logOut = () => {
    const user = JSON.parse(localStorage.getItem('current_user'));
    if (!user) return;

    if (user.id) {
      try {
        userService.logOut({ userId: user.id });
        window.location.replace('/');
      } catch (error) {
        console.log(error.message);
      }
    }
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('current_user');
    localStorage.removeItem('expiration');
  };

  const getUserToken = () => {
    const token = localStorage.getItem('access_token');
    return token ?? false;
  };

  const currentUser = () => {
    const current = JSON.parse(localStorage.getItem('current_user'));
    return current ?? false;
  };

  const refresh = async (token) => {
    if (!token) return;
    try {
      const response = await userService.refresh({ refreshToken: token });
      if (response.statusText === 'OK') {
        localStorage.setItem('access_token', response.data.accessToken);
        localStorage.setItem('refresh_token', response.data.refreshToken);
        await setUser(response.data.userId);
      } else return;
    } catch (error) {
      console.log(error.message);
    }
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

  const checker = () => {
    let check = null;
    const token = localStorage.getItem('refresh_token');

    if (token !== undefined && token !== 'undefined' && token !== null) {
      check = logoutTimer();
      if (!check) refresh(token);
    }
  };

  return { logIn, logOut, getUserToken, currentUser, checker };
}
