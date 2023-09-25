import { useEffect, useState } from 'react';

import BoardHeader from './BoardHeader';
import { BOARD_GUIDE, categories } from '../../constants/index';
import CategoryTab from '../common/CategoryTab';
import CardList from './BoardCard';
import Pagination from '../../hoc/Pagination';
import { postService } from '../../services/post.service';

export default function BoardContainer() {
  const [lastPage, setLastPage] = useState(0);
  const [list, setList] = useState([]);
  const [page, setPage] = useState(0);
  const [tab, setTab] = useState(0);

  const allList = async () => {
    try {
      const response = await postService.getAllPost({ page });
      setList(response.data.content);
      setLastPage(response.data.totalPages);
    } catch (error) {
      console.log(error);
    }
  };

  const selectedList = async (tabName) => {
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
      allList();
    } else if (tab !== 0) {
      const selectTab = categories.find((category) => category.id === tab);
      selectedList(selectTab.name);
    } else return;
  }, [tab, page]);

  return (
    <>
      <CategoryTab active={tab} categories={categories} setTab={setTab} />
      <BoardHeader />
      <CardList posts={list} guide={BOARD_GUIDE} />
      <Pagination
        page={page}
        count={lastPage}
        hidePrevButton={page < 10}
        hideNextButton={(page + 1) / 10 < 1}
        onChange={currentPage}
      />
    </>
  );
}
