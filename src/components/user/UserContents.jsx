import { styled } from 'styled-components';
import tw from 'twin.macro';

import Card from '../boardList/BoardCard';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/ProvideAuthContext';

const ContentsStyle = styled.div`
  ${tw`
    h-screen
    text-center
    overflow-hidden
  `}
`;

export default function UserContents({ visitor, active }) {
  const { getUserToken } = useAuth();
  const [list, setList] = useState([]);
  const [page, setPage] = useState(0);
  const [guide, setGuide] = useState('');

  useEffect(() => {
    if (active === 0) {
      getLikeList();
      setGuide('준비 중 입니다');
    } else if (active === 1) {
      getWriteList();
      setGuide('작성한 게시물이 없습니다');
    }
  }, [active]);

  const getLikeList = async () => {
    setList([]);
  };
  const getWriteList = async () => {
    try {
      const token = getUserToken();
      if (!token) return;

      const response = await axios.get(`/api/post/posts/nickname/${visitor.nickname}/${page}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data.content);
      setList(response.data.content);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ContentsStyle>
      <Card posts={list} guide={guide} />
    </ContentsStyle>
  );
}
