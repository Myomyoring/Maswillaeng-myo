import axios from 'axios';

export const commentService = {
  deleteComment({ commentId, token }) {
    return axios.delete(`/api/comment/${commentId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  deleteReply({ commentId, replyId, token }) {
    return axios.delete(`/api/comment/reply/${commentId}/${replyId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  getReply({ commentId }) {
    return axios.get(`/api/comment/reply/${commentId}`);
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
  submitReply({ parentId, content, token }) {
    return axios.post(
      `/api/comment/reply`,
      {
        parentId,
        content,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  },
  updateComment({ commentId, content, token }) {
    return axios.put(
      '/api/comment',
      { commentId, content },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  },
};
