import axios from 'axios';

export default function useAuth() {
  const getUser = async (id) => {
    if (!id) return;

    try {
      const { data } = await axios.get(`/api/user/${id}`);
      if (!data) return;
      // localStorage.removeItem('current_user');
      console.log(data);

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
      const response = await axios.post('/api/auth/login', { email, password });
      console.log(response);
      if (response.statusText === 'OK') {
        localStorage.setItem('access_token', response.data.accessToken);
        localStorage.setItem('refresh_token', response.data.refreshToken);
        const user = await getUser(response.data.userId);
        if (!user) return;

        setExpire(response.data.expires_in);

        return true;
      }
    } catch (err) {
      return false;
    }
  };

  const signOut = async () => {
    const user = JSON.parse(localStorage.getItem('current_user'));
    if (!user) return;
    if (user.id) {
      try {
        await axios.post('/api/auth/logout', { userId: user.id });
      } catch (err) {
        console.log(err);
      }
    }
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('current_user');
  };

  const getUserToken = () => {
    const token = localStorage.getItem('access_token');
    return token ? token : undefined;
  };

  const currentUser = () => {
    const current = JSON.parse(localStorage.getItem('current_user'));
    return current ? current : alert('로그인 먼저 해주세요!');
  };

  const refresh = async (token) => {
    if (!token) return;
    try {
      const response = await axios.post('/api/auth/issue', { refreshToken: token });
      if (response.statusText === 'OK') {
        localStorage.setItem('access_token', response.data.accessToken);
        localStorage.setItem('refresh_token', response.data.refreshToken);
        const user = await getUser(response.data.userId);
        if (!user) return;
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

    const autoLogout = Math.floor(today.getTime() - current);

    if (autoLogout > getExpiration) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('expiration');
      localStorage.removeItem('current_user');

      return true;
    }
  };

  const checker = () => {
    let check = null;
    const token = localStorage.getItem('refresh_token');

    if (token !== undefined && token !== 'undefined' && token !== null) {
      check = autoLogoutTimer();
      check === null ? refresh(token) : false;
    }
  };

  return { getUser, signIn, signOut, getUserToken, currentUser, refresh, autoLogoutTimer, checker };
}
