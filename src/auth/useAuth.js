import axios from 'axios';

export default function useAuth() {
  const getUser = async (id) => {
    if (!id) return;
    const { data } = await axios.get(`/api/user/${id}`);
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
  };

  const setExpire = async (expireTime) => {
    const currentTime = new Date();
    let expire = {
      current: currentTime.getTime(),
      expiration: expireTime,
    };
    localStorage.setItem('expiration', JSON.stringify(expire));
  };

  const signIn = async (email, password) => {
    const response = await axios.post('/api/auth/login', { email, password });
    if (response.statusText === 'OK') {
      localStorage.setItem('access_token', response.data.accessToken);
      localStorage.setItem('refresh_token', response.data.refreshToken);
      const user = await getUser(response.data.userId);
      if (!user) return;

      setExpire(response.data.expires_in);

      return true;
    }
  };

  const signOut = async () => {
    const user = JSON.parse(localStorage.getItem('current_user'));
    if (!user) return;
    if (user.id) {
      await axios.post('/api/auth/logout', { userId: user.id });
    }
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('current_user');
  };

  const refresh = async (token) => {
    if (!token) return;

    const response = await axios.post('/api/auth/issue', { refreshToken: token });
    if (response.statusText === 'OK') {
      localStorage.setItem('access_token', response.data.accessToken);
      localStorage.setItem('refresh_token', response.data.refreshToken);

      const user = await getUser(response.data.userId);
      if (!user) return;
    }
  };

  const logoutTimer = async () => {
    const getTime = JSON.parse(localStorage.getItem('expiration'));
    const today = new Date();
    console.log(getTime);
    // const getExpiration = getTime.expiration;
    const autoLogout = Math.floor(today.getTime() - getTime.current / 60 / 1000);

    if (autoLogout > 1) {
      signOut();
    }
  };

  return { signIn, signOut, refresh, logoutTimer };
}
