import axios from 'axios';

export const uploadService = {
  setImage({ formData, token }) {
    return axios.post('/api/post/upload', formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};
