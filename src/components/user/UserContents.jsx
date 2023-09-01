import { styled } from 'styled-components';
import tw from 'twin.macro';

// import displayCreatedAt from '../../utils/displayDate';
import Card from '../boardList/Card';
import { useEffect, useState } from 'react';

const ContentsStyle = styled.div`
  ${tw`
    // w-full
    h-screen
    // p-10
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

export default function UserContents({ active }) {
  const [list, setList] = useState([]);

  useEffect(() => {
    if (active === 0) {
      setList(likeList);
    } else if (active === 1) {
      setList(writeList);
    }
  }, [active]);
  return (
    <ContentsStyle>
      <Card posts={list} />
    </ContentsStyle>
  );
}
