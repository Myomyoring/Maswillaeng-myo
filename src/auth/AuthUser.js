import { userService } from '../services/user.service';

export default function AuthUser() {
  const setUser = async (id) => {
    if (!id) return;
    try {
      const { data } = await userService.getUser({ userId: id });
      if (!data) return;

      let currentUser = {
        email: data.email,
        id: id,
        nickname: data.nickname,
        follower: data.followerCnt,
        following: data.followingCnt,
        introduction: data.introduction,
        profileImage: data.userImage,
      };
      localStorage.setItem('current_user', JSON.stringify(currentUser));

      return data;
    } catch (err) {
      console.log(err);
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

  const signIn = async (email, password) => {
    try {
      const response = await userService.signIn({ email, password });
      if (response.statusText === 'OK') {
        const user = await setUser(response.data.userId);
        if (!user) return;
        localStorage.setItem('access_token', response.data.accessToken);
        localStorage.setItem('refresh_token', response.data.refreshToken);
        setExpire(response.data.expires_in);

        return true;
      }
    } catch (err) {
      return false;
    }
  };

  const signOut = () => {
    const user = JSON.parse(localStorage.getItem('current_user'));
    if (!user) return;
    if (user.id) {
      try {
        userService.signOut({ userId: user.id });
        window.location.replace('/');
      } catch (err) {
        console.log(err);
      }
    }
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('current_user');
    localStorage.removeItem('expiration');
  };

  const getUserToken = () => {
    const token = localStorage.getItem('access_token');
    return token ? token : undefined;
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
      }
    } catch (err) {
      console.log(err);
    }
  };

  const autoLogoutTimer = () => {
    const getTime = JSON.parse(localStorage.getItem('expiration'));
    if (!getTime) return;

    const today = new Date();
    const current = getTime.current;
    const getExpiration = getTime.expiration;

    const limitTime = Math.floor(today.getTime() - current);

    if (limitTime > getExpiration) {
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
      check = autoLogoutTimer();
      check && refresh(token);
    } else console.log('refresh X');
  };

  return { signIn, signOut, getUserToken, currentUser, checker };
}
