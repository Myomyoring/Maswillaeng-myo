import React, {useContext, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {loginSuccess, loginFailure} from "../redux/auth/actions";
import {SET_TOKEN} from "../store/Auth";
import {useDispatch} from "react-redux";
import AuthContext, {setLoginUser} from "../context/AuthContextProvider";
import {useRecoilState} from "recoil";
import {getLogin} from "../function/Login_api";

const LoginForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {loginHandler} = useContext(AuthContext)
    const [, setUser] = useRecoilState(setLoginUser);
    // 유저 입력 데이터 묶기
    const [join, setJoin] = useState({email: "", password: ""});
    // 유효성 검사 메세지
    const [errMSG, setErrMSG] = useState("");

    const inputValue = (e) => {
        const {name, value} = e.target;
        setJoin({
            ...join,
            [name]: value,
        });
    };
    const {email, password} = join;

    // 로그인 유효성
    const loginSubmit = (e) => {
        e.preventDefault();

        // 유효성 검사
        if (email === "" || password === "") {
            setErrMSG("아이디 비밀번호를 입력해주세요");
            return;
        }
        dispatch(getTokens(email, password));
    };
    // access token과 refresh token을 받아오는 함수
    const getTokens = (email, password, state) => async (dispatch) => {
        try {
            await getLogin(email, password)
                .then((response) => {
                    localStorage.clear();
                    loginHandler(response.accessToken, response.refreshToken)
                    setUser(response.userId)

                    dispatch(SET_TOKEN(state));
                    dispatch(loginSuccess(response.refreshToken, response.refreshToken));
                    // navigate("/", {replace: true});
                    window.location.replace("/")
                })
        } catch (err) {
            dispatch(loginFailure(err));
            alert("아이디 비밀번호를 확인해주세요")
        }
    };

    return (
        <div>
            <div
                className="flex h-screen w-full items-center justify-center bg-cover bg-no-repeat"
                style={{
                    backgroundImage:
                        "url(https://cdn.pixabay.com/photo/2018/03/18/18/54/drink-3237895_1280.jpg)",
                }}
            >
                <div
                    className="rounded-xl bg-[#FBF9EC] bg-opacity-40 px-44 py-20 shadow-lg backdrop-blur-md max-sm:px-14">
                    <div className="text-white">
                        <div className="mb-8 flex flex-col items-center text-2xl">
                            <Link to="/">
                                Mashillaeng
                            </Link>
                        </div>
                        <form onSubmit={loginSubmit}>
                            <div className="mb-4 text-lg">
                                <input
                                    className="rounded-3xl border-none bg-gray-50 bg-opacity-20 px-6 py-2 placeholder-slate-100 outline-none backdrop-blur-md"
                                    onChange={inputValue}
                                    value={email}
                                    name="email"
                                    type="text"
                                    placeholder="아이디"
                                />
                            </div>
                            <div className="mb-4 text-lg">
                                <input
                                    className="rounded-3xl border-none bg-gray-50 bg-opacity-20 px-6 py-2 placeholder-slate-100 outline-none backdrop-blur-md"
                                    onChange={inputValue}
                                    value={password}
                                    name="password"
                                    type="password"
                                    placeholder="비밀번호"
                                />
                                <div className="mt-3 text-center text-sm font-bold text-white">
                                    {errMSG}
                                </div>
                            </div>
                            <div className="mt-4 flex justify-center text-lg">
                                <button type="submit"
                                        className="rounded-3xl bg-[#EA4E4E] px-24 py-2 text-white shadow-xl duration-300 hover:bg-red-300">
                                    로그인
                                </button>
                            </div>
                            <div className="flex justify-around mt-5 text-sm">
                                <Link to="/Join" className="hover:text-[#EA4E4E]">
                                    회원가입
                                </Link>
                                {/*<Link to="" className="hover:text-[#EA4E4E]">*/}
                                {/*    아이디 / 비밀번호 찾기*/}
                                {/*</Link>*/}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
