import { styled } from 'styled-components';
import tw from 'twin.macro';

import Card from '../boardList/Card';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../../auth/ProvideAuthContext';

const ContentsStyle = styled.div`
  ${tw`
    h-screen
    text-center
    overflow-hidden
  `}
`;

const likeList = [
  {
    id: 0,
    createdDate: '2023-08-30T18:42:38.873241',
    nickname: '묘묘',
    thumbnail: '',
    title: '제목',
    userImage: '',
    categories: '',
  },
  {
    id: 1,
    createdDate: '2023-08-30T18:42:38.873241',
    nickname: '묘묘',
    thumbnail: '',
    title: '제목',
    userImage: '',
    categories: '',
  },
  {
    id: 2,
    createdDate: '2023-08-30T18:42:38.873241',
    nickname: '묘묘',
    thumbnail: '',
    title: '제목',
    userImage: '',
    categories: '',
  },
  {
    id: 3,
    createdDate: '2023-08-30T18:42:38.873241',
    nickname: '묘묘',
    thumbnail: '',
    title: '제목',
    userImage: '',
    categories: '',
  },
  {
    id: 4,
    createdDate: '2023-08-30T18:42:38.873241',
    nickname: '묘묘',
    thumbnail: '',
    title: '제목',
    userImage: '',
    categories: '',
  },
  {
    id: 5,
    createdDate: '2023-08-30T18:42:38.873241',
    nickname: '묘묘',
    thumbnail: '',
    title: '제목',
    userImage: '',
    categories: '',
  },
  {
    id: 6,
    createdDate: '2023-08-30T18:42:38.873241',
    nickname: '묘묘',
    thumbnail: '',
    title: '제목',
    userImage: '',
    categories: '',
  },
  {
    id: 7,
    createdDate: '2023-08-30T18:42:38.873241',
    nickname: '묘묘',
    thumbnail: '',
    title: '제목',
    userImage: '',
    categories: '',
  },
  {
    id: 8,
    createdDate: '2023-08-30T18:42:38.873241',
    nickname: '묘묘',
    thumbnail: '',
    title: '제목',
    userImage: '',
    categories: '',
  },
];

const writeList = [];

export default function UserContents({ visitor, active }) {
  const { getUserToken } = AuthContext();
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
