import React, {useContext} from "react";
import AuthContext from "../context/AuthContextProvider";
import {useNavigate} from "react-router-dom";
import LoginForm from "../pages/LoginForm";
import MyPage from "../pages/MyPage";
import Board from "../pages/Board";
import Join from "../pages/Join";
import BoardWrite from "../pages/BoardWrite";
import BoardDetail from "../pages/BoardDetail";
import BoardEdit from "../pages/BoardEdit";

const AuthenticateCheck = ({path, auth}) => {
    // 접근 제어 (context에서 상태 꺼내는게 alert보다 느려서 직접 토큰 꺼냄)
    const initialToken = localStorage.getItem("accessToken");
    // const {isLoggedIn} = useContext(AuthContext);
    const navigate = useNavigate();

    // 비로그인 유저가 권한이 로그인이 필요한 페이지에 접근하려 할 때
    if (auth === true) {
        if (!initialToken) {
            window.location.replace("/LoginForm")
            alert("로그인이 필요합니다!");
        }
    }
    // 로그인 한 유저가 권한이 비로그인 페이지에 접근하려 할 때
    if (auth === false) {
        if (initialToken) {
            window.location.replace("/")
            alert("로그인 상태입니다!");
        }
    }

    return (
        <>
            {path === "/" && <Board/>}
            {path === "/LoginForm" && <LoginForm/>}
            {path === "/UserPage/:nickname" && <MyPage/>}
            {path === "/Join" && <Join/>}
            {path === "/BoardWrite" && <BoardWrite/>}
            {path === "/Board/:postId" && <BoardDetail/>}
            {path === "/BoardEdit/:postId" && <BoardEdit/>}
        </>
    );
};

export default AuthenticateCheck;
