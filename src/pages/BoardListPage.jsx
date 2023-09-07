import React, { useEffect, useState } from 'react'; // eslint-disable-line no-unused-vars
import axios from 'axios';

import ImageLabel from '../components/boardList/ImageLabel';
import CategoryTab from '../components/boardList/CategoryTab';
import Card from '../components/boardList/Card';
import BoardStyle from '../components/boardList/BoardStyle';
import BoardNav from '../components/boardList/BoardNav';
import Pagination from '../utils/Pagination';

export default function BoardListPage() {
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState(0);
  const [list, setList] = useState([]);
  const [page, setPage] = useState(0);
  const [lastPage, setLastPage] = useState(0);
  const guide = '첫 게시물을 작성해주세요 🍹';

  const [total, setTotal] = useState(0);

  useEffect(() => {
    setLoading(true);
    const all = async () => {
      try {
        const response = await axios.get(`api/post/posts/${page}`);
        setList(response.data.content);
        setLastPage(response.data.totalPages);
        console.log(response.data);
        /* 
          number: 현재 페이지
          totalElements: 이 탭에 대한 총 게시물 수
          totalPages: 총 페이지 수
        */

        setTotal(response.data.totalElements);
      } catch (err) {
        console.log(err);
      }
    };

    const recipe = async () => {
      try {
        const response = await axios.get(`api/post/posts/category/RECIPE/${page}`);
        setList(response.data.content);
        setLastPage(response.data.totalPages);

        setTotal(response.data.totalElements);
      } catch (err) {
        console.log(err);
      }
    };
    const cocktail = async () => {
      try {
        const response = await axios.get(`api/post/posts/category/COCKTAIL/${page}`);
        setList(response.data.content);
        setLastPage(response.data.totalPages);

        setTotal(response.data.totalElements);
      } catch (err) {
        console.log(err);
      }
    };
    const etc = async () => {
      try {
        const response = await axios.get(`api/post/posts/category/ETC/${page}`);
        setList(response.data.content);
        setLastPage(response.data.totalPages);

        setTotal(response.data.totalElements);
      } catch (err) {
        console.log(err);
      }
    };

    //
    switch (tab) {
      case 0:
        all();
        // setPage(0);
        break;
      case 1:
        recipe();
        // setPage(0);
        break;
      case 2:
        cocktail();
        // setPage(0);
        break;
      case 3:
        etc();
        // setPage(0);
        break;
      default:
        all();
      // setPage(0);
    }
    setLoading(false);
  }, [tab, page]);

  const currentPage = (value) => {
    console.log(value);
    setPage(value - 1);
  };

  return (
    <>
      <ImageLabel />
      <BoardStyle>
        총 {total}개의 게시물
        <CategoryTab active={tab} setTab={setTab} />
        <BoardNav />
        {loading ? (
          <div>게시물 불러오는 중...</div>
        ) : (
          <>
            <Card posts={list} guide={guide} />
            <Pagination
              page={page}
              count={lastPage}
              hidePrevButton={page < 10}
              hideNextButton={(page + 1) / 10 < 1}
              onChange={currentPage}
            />
          </>
        )}
      </BoardStyle>
    </>
  );
}
