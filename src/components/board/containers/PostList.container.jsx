import { useEffect, useState } from 'react';

import { categories } from '../../../constants/index';
import PostListPresenter from '../presenters/PostList.presenter';
import { collection, getDoc, getDocs, limit, orderBy, query, startAfter } from 'firebase/firestore';
import { db } from '../../../firebase-config';
import { postService } from '../../../services/firebaseService/post.firebase.service';
import { userService } from '../../../services/firebaseService/user.firebase.service';

export default function PostListContainer() {
  const [lastPage, setLastPage] = useState(0);
  const [list, setList] = useState([]);
  const [page, setPage] = useState(1);
  const [tab, setTab] = useState(0);
  const [perPage] = useState(8);

  const getAllList = async () => {
    try {
      const data = [];
      const posts = await postService.getAllPost();
      const lastVisible = posts.docs[posts.docs.length - 1];
      posts.forEach((post) => {
        data.push({ ...post.data(), id: post.id });
      });

      const updatedData = [];

      for (const item of data) {
        const getNicknames = await userService.getUserById({ userId: item.userId });
        getNicknames.forEach((doc) => {
          let user = doc.data();
          if (user.id === item.userId) {
            updatedData.push({ ...item, nickname: user.nickname });
          }
        });
      }

      setList(updatedData);
      console.log(list);
      // setLastPage(response.data.totalPages);
    } catch (error) {
      console.log(error);
    }
  };

  const getSelectedList = async (tabName) => {
    try {
      // const response = await postService.getSelectedTabPost({ tabName, page });
      // setList(response.data.content);
      // setLastPage(response.data.totalPages);
    } catch (error) {
      console.log(error);
    }
  };

  const currentPage = (value) => {
    setPage(value - 1);
  };

  useEffect(() => {
    if (tab === 0) {
      getAllList();
    } else if (tab !== 0) {
      const selectTab = categories.find((category) => category.id === tab);
      getSelectedList(selectTab.name);
    } else return;
  }, [tab, page]);

  return <PostListPresenter {...{ categories, tab, setTab, list, page, currentPage, lastPage }} />;
}
