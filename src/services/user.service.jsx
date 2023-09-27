import axios from 'axios';

export const userService = {
  duplicateEmail({ email }) {
    return axios.post('/api/auth/duplicate/email', { email });
  },
  duplicateNickName({ nickname }) {
    return axios.post('/api/auth/duplicate/nickname', { nickname });
  },
  getUser({ userId }) {
    return axios.get(`/api/user/${userId}`);
  },
  logIn({ email, password }) {
    return axios.post('/api/auth/login', { email, password });
  },
  logOut({ userId }) {
    return axios.post('/api/auth/logout', { userId });
  },
  refresh({ refreshToken }) {
    return axios.post('/api/auth/issue', { refreshToken });
  },
  signUp({ userImage, email, password, nickname, phoneNumber, introduction }) {
    return axios.post('/api/auth/sign', {
      userImage,
      email,
      password,
      nickname,
      phoneNumber,
      introduction,
    });
  },
};
