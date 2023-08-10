import React, { useEffect, useState } from 'react'; // eslint-disable-line no-unused-vars
import { Link } from 'react-router-dom';
import ImageLabel from '../components/boardList/ImageLabel';
import BoardStyle from '../styles/BoardStyle';
import ToggleTab from '../components/boardList/ToggleTab';
import TabBoard from '../components/boardList/TabBoard';
import ToggleList from '../components/boardList/ToggleList';

import data from '../components/boardList/dummy.json';

export default function BoardListPage() {
  const [boardState, setBoardState] = useState('0');
  const [list, setList] = useState(data[0]);

  useEffect(() => {
    setList(data[boardState]);
  }, [boardState]);

  return (
    <>
      <ImageLabel />
      <BoardStyle>
        <Link to={`/board`} />
        <ToggleTab isList={ToggleList} active={boardState} state={setBoardState} />
        <TabBoard data={list} />
      </BoardStyle>
    </>
  );
}
