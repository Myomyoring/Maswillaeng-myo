import React, {createContext, useEffect, useState} from 'react';
import {atom, selector} from "recoil";
import {recoilPersist} from "recoil-persist";
import axios from "axios";

const EXPIRE_TIME = 1000 * 60 * 60;// 1시간

// context 초기값 셋팅
const AuthContext = createContext({
    isLoggedIn: false,
    setIsLoggedIn: () => {
    },
    loginUser: {},
    loginHandler: () => {
    },
    logoutHandler: () => {
    },
    getUser: () => {
    },
});

// 로그인 시, 유저정보 저장 - 로컬에 recoil이 자동 저장
const {persistAtom} = recoilPersist();
export const setLoginUser = atom({
    key: "no.",
    default: {
        userId: "",
    },
    effects_UNSTABLE: [persistAtom],
});

// recoil에 저장된 userId 가져오기
export const getLoginUser = selector({
    key: "getLoginUser",
    get: ({get}) => {
        const userId = get(setLoginUser);
        return userId;
    },
});

export const AuthContextProvider = (props) => {
    // 로컬에 있는 토큰 가져오기
    const initialToken = localStorage.getItem("accessToken");
    // at
    const [token, setToken] = useState(initialToken);

    // 로그인 상태 확인
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    useEffect(() => {
        if (token) {
            setIsLoggedIn(true)
        } else
            setIsLoggedIn(false)
    }, [])

    // 로그인 & 로그아웃 처리
    const loginHandler = (accessToken, refreshToken) => {
        setToken(accessToken);
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        loginOk(accessToken);
    };
    // 로그인 성공 시, defaults.header 설정, 59분 후 updateToken 함수 실행 설정
    const loginOk = (accessToken) => {
        axios.defaults.headers.common["Authorization"] = token ? `Bearer ${accessToken}` : null;
        setTimeout(updateToken, EXPIRE_TIME - 60000);
    }
    // 토큰 만료 1분 전에 RTR 실행
    const updateToken = async () => {
        const refreshToken = localStorage.getItem("refreshToken");
        try {
        await axios.post("/api/auth/issue", {
            refreshToken: refreshToken
        })
            .then((res) => {
                loginOk(res.data.accessToken)
                loginHandler(res.data.accessToken, res.data.refreshToken)
            })
        } catch (err) {

        }
    }

    // 로그아웃 시 토큰 지우기
    const logoutHandler = () => {
        setToken(null);
        localStorage.clear();
    };
    return (
        <AuthContext.Provider
            value={{
                isLoggedIn,
                setIsLoggedIn,
                loginHandler,
                logoutHandler,
                token,
                updateToken,
            }}>
            {props.children}
        </AuthContext.Provider>
    );
};
export default AuthContext;