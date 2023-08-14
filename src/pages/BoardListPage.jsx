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

  // 탭에 의해서 카테고리 포스트 종류가 바뀌어야 한다 - 프론트에서 탭 상태 관리
  const [tab, setTab] = useState('0');
  // 서버에서 현재 카테고리와 같은 포스트 리스트를 담기
  // tab이 바뀔 때마다 서버에 요청 넣어야 함
  const [list, setList] = useState([]);

  // 카테고리가 바뀌며 리스트를 새로 불러 올 경우, 0으로 초기화, 페이지 네이션 버튼이 클릭될 때 바뀌는 값
  // 바뀔 때마다 서버에 요청 넣어야 함
  const [page, setPage] = useState(0);

  useEffect(() => {
    setLoading(true);
    const all = async () => {
      try {
        const res = await axios.get(`api/post/posts/${page}`);
        setList(res.data.content);
        console.log('전체');
      } catch (err) {
        console.log(err);
      }
    };
    const recipe = async () => {
      try {
        const res = await axios.get(`api/post/posts/category/RECIPE/${page}`);
        setList(res.data.content);
        console.log('레시피');
      } catch (err) {
        console.log(err);
      }
    };
    const cocktail = async () => {
      try {
        const res = await axios.get(`api/post/posts/category/COCKTAIL/${page}`);
        setList(res.data.content);
        console.log('칵테일');
      } catch (err) {
        console.log(err);
      }
    };
    const etc = async () => {
      try {
        const res = await axios.get(`api/post/posts/category/ETC/${page}`);
        setList(res.data.content);
        console.log('기타');
      } catch (err) {
        console.log(err);
      }
    };
    switch (tab) {
      case '0':
        all();
        setPage(0);
        break;
      case '1':
        recipe();
        setPage(0);
        break;
      case '2':
        cocktail();
        setPage(0);
        break;
      case '3':
        etc();
        setPage(0);
        break;
      default:
        all();
        setPage(0);
    }
    setLoading(false);
  }, [tab]);

  useEffect(() => {}, [page]);

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
            <Card posts={list} />
            <Pagination />
          </>
        )}
      </BoardStyle>
    </>
  );
}
