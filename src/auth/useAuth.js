import { useState } from 'react';
import axios from 'axios';

const EXPIRE_TIME = 1000 * 60 * 60;

export default function useAuth() {
  // 새로고침 시 사라지는 값
  const [user, setUser] = useState(null);
  const [id, setId] = useState(null);

  const getUser = async (id) => {
    if (!id) return;
    const { data } = await axios.get(`/api/user/${id}`);
    setId(id);
    console.log(user);
    return data;
  };

  const signIn = async (email, password) => {
    const response = await axios.post('/api/auth/login', { email, password });
    if (response.statusText === 'OK') {
      localStorage.setItem('access_token', response.data.accessToken);
      localStorage.setItem('refresh_token', response.data.refreshToken);
      const user = await getUser(response.data.userId);
      if (!user) return;

      setUser(user);
      return true;
    }
  };

  const signOut = async () => {
    if (id) {
      await axios.post('/api/auth/logout', { userId: id });
    }
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');

    setUser(null);
  };

  const refresh = async (token) => {
    if (!token) return;

    const response = await axios.post('/api/auth/issue', { refreshToken: token });
    if (response.statusText === 'OK') {
      localStorage.setItem('access_token', response.data.accessToken);
      localStorage.setItem('refresh_token', response.data.refreshToken);

      const user = await getUser(response.data.userId);
      if (!user) return;

      setUser(user);
    }
  };
  return { user, signIn, signOut, refresh };
}
