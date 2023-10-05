import { useEffect, useState } from 'react';

import { categories } from '../../../constants/index';
import { postService } from '../../../services/post.service';
import PostListPresenter from '../presenters/PostList.presenter';

export default function PostListContainer() {
  const [lastPage, setLastPage] = useState(0);
  const [list, setList] = useState([]);
  const [page, setPage] = useState(0);
  const [tab, setTab] = useState(0);

  const getAllList = async () => {
    try {
      const response = await postService.getAllPost({ page });
      setList(response.data.content);
      setLastPage(response.data.totalPages);
    } catch (error) {
      console.log(error);
    }
  };

  const getSelectedList = async (tabName) => {
    try {
      const response = await postService.getSelectedTabPost({ tabName, page });
      setList(response.data.content);
      setLastPage(response.data.totalPages);
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
