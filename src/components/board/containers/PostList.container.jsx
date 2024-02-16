import { useEffect, useState } from 'react';

import { categories } from '../../../constants/index';
import { postService } from '../../../services/firebaseService/post.firebase.service';
import { userService } from '../../../services/firebaseService/user.firebase.service';

import Card from '../../common/Card';
import LoadingScreen from '../../common/LoadingScreen';
import Pagination from '../../common/Pagination';
import PostListPresenter from '../presenters/PostList.presenter';

export default function PostListContainer() {
  const [posts, setPosts] = useState([]);
  const [tab, setTab] = useState(0);
  const [isLoading, setLoading] = useState(false);

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

  const getInitialData = async (postDoc) => {
    try {
      const initialData = [];
      await postDoc.forEach((doc) => {
        const { thumbnail, createDate, title, likeCnt, userId, commentCount } = doc.data();
        initialData.push({
          thumbnail,
          createDate,
          title,
          likeCnt,
          userId,
          commentCount,
          id: doc.id,
        });
      });
      return initialData;
    } catch (error) {
      console.log(error);
    }
  };

  const getUpdateData = async (initialData) => {
    try {
      const updateData = [];
      for (const data of initialData) {
        const userDoc = await userService.getUserById({ userId: data.userId });
        userDoc.forEach((doc) => {
          const user = doc.data();
          if (user.userId === data.userId) {
            updateData.push({ ...data, nickname: user.nickname });
          }
        });
      }
      return updateData;
    } catch (error) {
      console.log(error);
    }
  };

  const getAllPosts = async () => {
    try {
      setLoading(true);
      const postDoc = await postService.getAllPost();
      const initialData = await getInitialData(postDoc);
      return await getUpdateData(initialData);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getSelectedPosts = async (tabName) => {
    try {
      setLoading(true);
      const postDoc = await postService.getSelectedTabPost({ tabName });
      const initialData = await getInitialData(postDoc);
      return await getUpdateData(initialData);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const setAllPosts = async () => {
    const posts = await getAllPosts();
    setPostData(posts);
  };

  const setSelectedPosts = async (tabName) => {
    const posts = await getSelectedPosts(tabName);
    setPostData(posts);
  };

  const onPageChange = (value) => {
    setCurrentPage(value);
  };

  useEffect(() => {
    if (tab === 0) {
      setAllPosts();
      setCurrentPage(1);
    } else if (tab !== 0) {
      const currentTab = categories.find((category) => category.id === tab);
      setSelectedPosts(currentTab.name);
      setCurrentPage(1);
    } else return;
  }, [tab]);

  useEffect(() => {
    setPostData(pagingData);
  }, [pagingData, currentPage]);

  return (
    <PostListPresenter
      {...{
        categories,
        tab,
        setTab,
      }}
    >
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <>
          <Card posts={posts} />
          <Pagination
            currentPage={currentPage}
            lastPage={lastPage}
            hidePrevButton={hidePrevButton}
            hideNextButton={hideNextButton}
            onChange={onPageChange}
          />
        </>
      )}
    </PostListPresenter>
  );
}
