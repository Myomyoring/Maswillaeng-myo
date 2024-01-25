import { useEffect, useState } from 'react';

import { categories } from '../../../constants/index';
import PostListPresenter from '../presenters/PostList.presenter';
import { postService } from '../../../services/firebaseService/post.firebase.service';
import { userService } from '../../../services/firebaseService/user.firebase.service';

export default function PostListContainer() {
  const [posts, setPosts] = useState([]);
  const [tab, setTab] = useState(0);
  const [isLoading, setLoading] = useState(false);

  const [pagingData, setPagingData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(0);
  const perPage = 8;
  const lastIndex = currentPage * perPage;
  const firstIndex = lastIndex - perPage;

  const paging = async (data) => {
    setLastPage(Math.ceil(data.length / perPage));
    setPosts(data.slice(firstIndex, lastIndex));
  };

  const getAllList = async () => {
    try {
      setLoading(true);
      const initialData = [];
      const postDoc = await postService.getAllPost();
      postDoc.forEach((doc) => {
        const { thumbnail, createDate, title, likeCnt, userId } = doc.data();
        initialData.push({
          thumbnail,
          createDate,
          title,
          likeCnt,
          userId,
          id: doc.id,
        });
      });
      const updatedData = [];
      for (const post of initialData) {
        const userDoc = await userService.getUserById({ userId: post.userId });
        userDoc.forEach((doc) => {
          const user = doc.data();
          if (user.id === post.userId) {
            updatedData.push({ ...post, nickname: user.nickname });
          }
        });
        paging(updatedData);
        setPagingData(updatedData);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getSelectedList = async (tabName) => {
    try {
      setLoading(true);
      const initialData = [];
      const postDoc = await postService.getSelectedTabPost({ tabName });
      postDoc.forEach((doc) => {
        const { thumbnail, createDate, title, likeCnt, userId } = doc.data();
        initialData.push({
          thumbnail,
          createDate,
          title,
          likeCnt,
          userId,
          id: doc.id,
        });
      });
      const updatedData = [];
      for (const post of initialData) {
        const userDoc = await userService.getUserById({ userId: post.userId });
        userDoc.forEach((doc) => {
          const user = doc.data();
          if (user.id === post.userId) {
            updatedData.push({ ...post, nickname: user.nickname });
          }
        });
        paging(updatedData);
        setPagingData(updatedData);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const onPageChange = (value) => {
    setCurrentPage(value);
  };

  useEffect(() => {
    if (tab === 0) {
      getAllList();
      setCurrentPage(1);
    } else if (tab !== 0) {
      const selectTab = categories.find((category) => category.id === tab);
      getSelectedList(selectTab.name);
      setCurrentPage(1);
    } else return;
  }, [tab]);

  useEffect(() => {
    paging(pagingData);
  }, [pagingData, currentPage]);

  return <PostListPresenter {...{ categories, tab, setTab, posts, currentPage, onPageChange, lastPage, isLoading }} />;
}
