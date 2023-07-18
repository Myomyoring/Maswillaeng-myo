import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Pagination} from "@mui/material";
import {displayCreatedAt} from "../../function/Board_api";
import {Link} from "react-router-dom";

const UserWriteContents = ({ nickname, token }) => {
    // 게시물 데이터
    const [userWriteList, setUserWriteList] = useState([]);
    // 페이지 네이션
    const [firstPost, setFirstPost] = useState(1)
    // 마지막 페이지
    const [lastPost, setLastPost] = useState(0)
    // 총 현재 탭 게시물 수 확인
    const [totalPostCount, setTotalPostCount] = useState(0);
    // 서버 데이터의 현재 페이지
    const [page, setPage] = useState(0);
    // 좋아요 리스트
    const [likes, setLikes] = useState([])
    // 현재 페이지 바꾸기
    const currentPage = (e, value) => {
        setPage(value-1)
        setFirstPost(value)
    }
    useEffect(() => {
        const writeContentList = async () => {
            const res = await axios.get(`/api/post/posts/nickname/${nickname}/${page}`,{
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            const LikeMatch = await Promise.all(res.data.content.map((item) => axios.get(`/api/post/${item.id}`)));
            const likes = LikeMatch.map((res) => res.data.likeCnt);
            setLikes(likes);

            return res.data;
        }
        writeContentList()
            .then((list) => {
                setUserWriteList(list.content)
                setTotalPostCount(list.totalElements) // 전체 게시물 갯수
                setLastPost(list.totalPages) // 총 페이지 수
            })
            .catch((err) => {
                console.log("작성한 글 에러")
                console.log(err)
            })
    },[page])
    return (
        <>
            {
                userWriteList.map((item, idx) => (
            <div className="text-center p-5" key={item.id}>
                <Link to={`/Board/${item.id}`}>
                    <div className="h-52 overflow-hidden rounded-md">
                        <img src={ item.thumbnail === null ? item.thumbnail : "/img/board_thumbnail.png" } className="m-auto w-52 h-52" />
                    </div>
                    <div className="font-bold my-3 overflow-hidden whitespace-nowrap text-ellipsis">
                        {item.title}
                    </div>
                </Link>
                <span className="text-sm pr-3">
                    { displayCreatedAt(item.createdDate) }
                </span>
                <span className="text-sm pl-3">
                    💗 {likes.filter((like, index) => index === idx) ? likes.filter((like, index) => index === idx) : "0"}
                </span>
            </div>
                ))
        }
            <div className="m-auto text-2xl col-span-3">
                <Pagination
                    size="large"
                    page={ firstPost }
                    count={ lastPost }
                    hidePrevButton={ page === 0 }
                    hideNextButton={ firstPost === lastPost }
                    onChange={ currentPage } />
            </div>
        </>
    );
};

export default UserWriteContents;