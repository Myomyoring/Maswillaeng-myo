import axios from 'axios';

export const followService = {
  deleteFollow({ nickname, token }) {
    return axios.delete(`/api/follow/${nickname}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  getFollower({ nickname }) {
    return axios.get(`/api/follow/follower/nickname/${nickname}`);
  },
  getFollowing({ nickname }) {
    return axios.get(`/api/follow/following/nickname/${nickname}`);
  },
  saveFollow({ nickname, token }) {
    return axios.post(
      `/api/follow/${nickname}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  },
};
