import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { ETC_MESSAGE } from '../../../constants';
import UserContentsPresenter from '../presenters/UserPosts.presenter';
import { postService } from '../../../services/firebaseService/post.firebase.service';
import { likeService } from '../../../services/firebaseService/like.firebase.service';
import { userService } from '../../../services/firebaseService/user.firebase.service';

export default function UserPostsContainer({ active }) {
  const { nickname } = useParams();
  const [isLoading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [guide, setGuide] = useState('');

  // client limit offset pagination
  const [pagingData, setPagingData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(0);
  const perPage = 8;
  const lastIndex = currentPage * perPage;
  const firstIndex = lastIndex - perPage;
  const hidePrevButton = currentPage < 5;
  const hideNextButton = (currentPage + 1) / 5 < 1;

  const setPostData = (data) => {
    setPagingData(data);
    setLastPage(Math.ceil(data.length / perPage));
    setPosts(data.slice(firstIndex, lastIndex));
  };

  const setUserPost = async (active) => {
    const memberId = await getMemberId();
    if (active === 0) {
      try {
        setLoading(true);
        const postIds = await getLikeIdList(memberId);
        const likePosts = await getLikeList(postIds);
        setPostData(likePosts);
        setGuide(ETC_MESSAGE.PREPARING);
      } catch (error) {
        console.log(error.code);
      } finally {
        setLoading(false);
      }
    } else if (active === 1) {
      try {
        setLoading(true);
        const writePosts = await getWriteList(memberId);
        setPostData(writePosts);
        setGuide(ETC_MESSAGE.BOARD_EMPTY);
      } catch (error) {
        console.log(error.code);
      } finally {
        setLoading(false);
      }
    }
  };

  const getMemberId = async () => {
    let id = '';
    const response = await userService.getUserByNickname({ nickname });
    response.forEach((doc) => {
      const { userId } = doc.data();
      id = userId;
    });
    return id;
  };

  const getLikeIdList = async (memberId) => {
    const likePostIds = [];
    try {
      const response = await likeService.getUserLikes({ userId: memberId });
      response.forEach((doc) => {
        likePostIds.push(doc.id);
      });
      return likePostIds;
    } catch (error) {
      console.log(error.code);
    }
  };

  const getLikeList = async (postIds) => {
    const list = [];
    for (let id of postIds) {
      const response = await postService.getPost({ postId: id });
      console.log(response);
      const { postId, userId } = response.data();
      list.push({ postId, userId });
    }
    return list;
  };

  const getWriteList = async (memberId) => {
    try {
      const list = [];
      const response = await postService.getUserWritePost({ userId: memberId });
      response.forEach((doc) => {
        const { createDate, likCnt, thumbnail, title } = doc.data();
        list.push({ id: doc.id, createDate, likCnt, thumbnail, title, nickname });
      });
      return list;
    } catch (error) {
      console.log(error.code);
    }
  };

  const onPageChange = (value) => {
    setCurrentPage(value);
  };

  useEffect(() => {
    setUserPost(active);
  }, [active]);

  useEffect(() => {
    setPostData(pagingData);
  }, [pagingData, currentPage]);

  return (
    <UserContentsPresenter
      {...{ isLoading, posts, guide, currentPage, lastPage, hidePrevButton, hideNextButton, onPageChange }}
    />
  );
}
