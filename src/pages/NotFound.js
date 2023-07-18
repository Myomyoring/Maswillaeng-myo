import React from 'react';
import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="m-auto">
            <div className="text-center mt-72 text-5xl mb-10">
                없는 페이지 입니다!
            </div>
            <Link className="text-xl text-center m-auto hover:text-red-500" to="/">
                <div>메인페이지로 이동하기</div>
            </Link>
        </div>
    );
};

export default NotFound;