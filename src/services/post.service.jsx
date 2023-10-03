import axios from 'axios';

export const postService = {
  deletePost({ postId }) {
    return axios.delete(`/api/post/${postId}`);
  },
  getAllPost({ page }) {
    return axios.get(`api/post/posts/${page}`);
  },
  getSelectedTabPost({ tabName, page }) {
    return axios.get(`api/post/posts/category/${tabName}/${page}`);
  },
  getPost({ postId }) {
    return axios.get(`/api/post/${postId}`);
  },
  getUserWritePost({ nickname, page, token }) {
    return axios.get(`/api/post/posts/nickname/${nickname}/${page}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  submitWritePost({ post, token }) {
    return axios.post('/api/post', post, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
  },
  submitModifyPost({ postId, post, token }) {
    return axios.put(`/api/post/${postId}`, post, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
  },
};
