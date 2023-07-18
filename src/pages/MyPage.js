import React, {useContext, useEffect, useState} from 'react';
import UserProfile from "../components/mypage/UserProfile";
import UserWriteContents from "../components/mypage/UserWriteContents";
import {useParams} from "react-router-dom";
import axios from "axios";
import AuthContext, {getLoginUser} from "../context/AuthContextProvider";
import {useRecoilValue} from "recoil";

const MyPage = () => {
    // 로그인 상태, 토큰
    const { isLoggedIn, token, updateToken } = useContext(AuthContext);
    const { nickname } = useParams();

    // 유저 정보 상태
    const [member, setMember] = useState({})
    // 유저 데이터 불러오기
    useEffect(() => {
        const getMember = async () => {
            const res = await axios.get(`/api/user/nickname?nickname=${nickname}`)
            return res.data;
        }
        getMember()
            .then((user) => setMember(user)) // email, nickname, userImage, introduction
    }, [nickname])

    // 게시물 탭 토글 - false: 작성한 글, true: 좋아요한 글
    const [userContent, setUserContent] = useState(false);
    const contentToggle = () => {
        setUserContent(!userContent);
    }
    return (
        <>
            {
                isLoggedIn &&
            <div className="flex w-full h-screen">
                <UserProfile visitUser={ nickname } member={ member } token={ token } />
                <div className="w-2/3 h-screen overflow-auto">
                    {/* 토글 */}
                    <div className="w-full h-20 flex text-center p-5">
                        <div className="font-bold w-full mx-3 border-b-2 border-b-[#EA4E4E]">
                            <span>
                                작성한 글
                            </span>
                        </div>
                        {/*<div*/}
                        {/*    className={userContent ? "font-bold w-1/2 mx-3 border-b-2 border-b-[#EA4E4E]" : "w-1/2 mx-3"}>*/}
                        {/*    <button onClick={contentToggle}>*/}
                        {/*        좋아요한 글*/}
                        {/*    </button>*/}
                        {/*</div>*/}
                    </div>
                    {/* 글 */}
                    <div className="mx-3 grid grid-cols-3">
                        {/* 작성한 글 */}
                        {!userContent && <UserWriteContents nickname={ nickname } token={ token } />
                        }
                        {/* 좋아요한 글 */}
                        {/*{userContent && <UserLikeContents nickname={ nickname } token={ token } />*/}
                        {/*}*/}
                    </div>
                </div>
            </div>
        }
        </>
    );
};

export default MyPage;