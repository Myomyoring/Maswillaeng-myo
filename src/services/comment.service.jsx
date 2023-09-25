import axios from 'axios';

export const commentService = {
  deleteComment({ commentId, token }) {
    return axios.delete(`/api/comment/${commentId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  submitComment({ postId, content, token }) {
    return axios.post(
      '/api/comment',
      { postId, content },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  },
};
