import React, { useEffect, useState } from 'react'; // eslint-disable-line no-unused-vars
import axios from 'axios';
import { styled } from 'styled-components';
import tw from 'twin.macro';

import ImageLabel from '../components/boardList/ImageLabel';
import CategoryTab from '../components/boardList/CategoryTab';
import Card from '../components/boardList/Card';
import BoardStyle from '../components/boardList/BoardStyle';
import BoardNav from '../components/boardList/BoardNav';

const Pagination = styled.div`
  ${tw``}
`;

export default function BoardListPage() {
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState(0);
  const [list, setList] = useState([]);
  const [page, setPage] = useState(0);
  const guide = '첫 게시물을 작성해주세요 🍹';

  useEffect(() => {
    setLoading(true);
    const all = async () => {
      try {
        const response = await axios.get(`api/post/posts/${page}`);
        setList(response.data.content);
        console.log(response.data.content);
        console.log('전체');
      } catch (err) {
        console.log(err);
      }
    };
    const recipe = async () => {
      try {
        const response = await axios.get(`api/post/posts/category/RECIPE/${page}`);
        setList(response.data.content);
        console.log('레시피');
      } catch (err) {
        console.log(err);
      }
    };
    const cocktail = async () => {
      try {
        const response = await axios.get(`api/post/posts/category/COCKTAIL/${page}`);
        setList(response.data.content);
        console.log('칵테일');
      } catch (err) {
        console.log(err);
      }
    };
    const etc = async () => {
      try {
        const response = await axios.get(`api/post/posts/category/ETC/${page}`);
        setList(response.data.content);
        console.log('기타');
      } catch (err) {
        console.log(err);
      }
    };

    //
    switch (tab) {
      case 0:
        all();
        setPage(0);
        break;
      case 1:
        recipe();
        setPage(0);
        break;
      case 2:
        cocktail();
        setPage(0);
        break;
      case 3:
        etc();
        setPage(0);
        break;
      default:
        all();
        setPage(0);
    }
    setLoading(false);
  }, [tab]);

  // useEffect(() => {}, [page]);

  return (
    <>
      <ImageLabel />
      <BoardStyle>
        <CategoryTab active={tab} setTab={setTab} />
        <BoardNav />
        {loading ? (
          <div>게시물 불러오는 중...</div>
        ) : (
          <>
            <Card posts={list} guide={guide} />
            <Pagination />
          </>
        )}
      </BoardStyle>
    </>
  );
}
