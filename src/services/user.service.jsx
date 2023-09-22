import axios from 'axios';

export const userService = {
  getUser({ userId }) {
    return axios.get(`/api/user/${userId}`);
  },
  signIn({ email, password }) {
    return axios.post('/api/auth/login', { email, password });
  },
  signOut({ userId }) {
    return axios.post('/api/auth/logout', { userId });
  },
  refresh({ refreshToken }) {
    return axios.post('/api/auth/issue', { refreshToken });
  },
};
