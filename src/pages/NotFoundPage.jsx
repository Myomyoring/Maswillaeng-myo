import React from 'react';
import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <>
            없는 페이지 입니다!
            <Link to={'/'}>
                <span>메인페이지로 이동하기</span>
            </Link>
        </>
    );
};

export default NotFound;