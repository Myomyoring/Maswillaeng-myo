import axios from 'axios';

export const likeService = {
  addLike({ postId, token }) {
    return axios.post(
      `/api/like/${postId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  },
  deleteLike({ postId, token }) {
    return axios.delete(`/api/like/${postId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};
