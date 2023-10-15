import axios from 'axios';

export const commentService = {
  deleteComment({ commentId, token }) {
    return axios.delete(`/api/comment/${commentId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  deleteReply({ parentId, replyId, token }) {
    return axios.delete(`/api/comment/reply/${parentId}/${replyId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  getReply({ commentId }) {
    return axios.get(`/api/comment/reply/${commentId}`);
  },
  saveComment({ postId, content, token }) {
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
  saveReply({ parentId, content, token }) {
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
  updateReply({ replyId, content, token }) {
    return axios.put(
      `/api/comment/reply`,
      { replyId, content },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  },
};
