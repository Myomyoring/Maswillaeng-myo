import React, { useEffect, useState } from 'react';
import ImageLabel from '../components/boardList/ImageLabel';
import BoardStyle from '../style/BoardStyle';
import ToggleTab from '../components/boardList/ToggleTab';
import TabBoard from '../components/boardList/TabBoard';
import ToggleList from '../components/boardList/ToggleList';

import data from '../components/boardList/dummy.json'
import ImageInput from '../components/signUp/ImageInput';

export default function BoardListPage() {
    const [boardState, setBoardState] = useState('0');
    const [list, setList] = useState(data[0]);

    useEffect(() => {
        setList(data[boardState])
    },[boardState])

    return (
        <>
            <ImageLabel />
            <BoardStyle>
                <ToggleTab isList={ ToggleList } active={ boardState } state={ setBoardState } />
                <TabBoard data={ list } />
            </BoardStyle>  
        </>  
    );
}