import axios from 'axios';

export const userService = {
  deleteUser({ token }) {
    return axios.delete(`/api/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  duplicateEmail({ email }) {
    return axios.post('/api/auth/duplicate/email', { email });
  },
  duplicateNickName({ nickname }) {
    return axios.post('/api/auth/duplicate/nickname', { nickname });
  },
  duplicatePassword({ userId, password, token }) {
    return axios.post(
      '/api/auth/password',
      {
        userId,
        password,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  },
  getUserById({ userId }) {
    return axios.get(`/api/user/${userId}`);
  },
  getUserByNickname({ nickname }) {
    return axios.get(`/api/user/nickname?nickname=${nickname}`);
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
  updateUser({ password, phoneNumber, nickname, userImage, introduction, token }) {
    return axios.put(
      `/api/user`,
      {
        password,
        phoneNumber,
        nickname,
        userImage,
        introduction,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  },
};
