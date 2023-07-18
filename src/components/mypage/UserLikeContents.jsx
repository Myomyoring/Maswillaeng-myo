import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Pagination} from "@mui/material";
import {displayCreatedAt} from "../../function/Board_api";

const UserLikeContents = ({ nickname, token }) => {
    // 게시물 데이터
    const [userLikeList, setUserLikeList] = useState([]);
    // 로딩 상태
    const [loading, setLoading] = useState(false);

    // 페이지 네이션 (offset ver.)
    // 게시물 인지
    // page는 0부터 시작하지만, 첫 페이지 버튼은 1부터 시작
    const [firstPost, setFirstPost] = useState(1)
    // 마지막 페이지
    const [lastPost, setLastPost] = useState(0)
    // 총 현재 탭 게시물 수 확인
    const [totalPostCount, setTotalPostCount] = useState(0);
    // 서버 데이터의 현재 페이지
    const [page, setPage] = useState(0);
    // 현재 페이지 바꾸기
    const currentPage = (e, value) => {
        setPage(value-1)
        setFirstPost(value)
    }

    useEffect(() => {
        const likeContentList = async () => {
            const res = await axios.get(`/api/post/posts/nickname/${nickname}/${page}`,{
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            console.log(res.data);
            return res.data;
        }
        setLoading(true)
        likeContentList()
            .then((list) => {
                setUserLikeList(list.content)
                setTotalPostCount(list.totalElements) // 전체 게시물 갯수
                setLastPost(list.totalPages) // 총 페이지 수
            })
            .catch((err) => {
                console.log("작성한 글 에러")
                console.log(err)
            })
        setLoading(false)
    },[page])

    return (
        <>
            {
                userLikeList.map((item) => (
            <div className="text-center p-5" key={item.id}>
                <div className="h-52 overflow-hidden rounded-md">
                    <img src={item.thumbnail} />
                </div>
                <div className="font-bold my-3 overflow-hidden whitespace-nowrap text-ellipsis">
                    {item.title}
                </div>
                <span className="text-sm pr-3">
                    { displayCreatedAt(item.createdDate) }
                </span>
                <span className="text-sm pl-3">
                    💗 100
                </span>
            </div>
                ))
            }
            <div className="my-5 m-auto text-2xl col-span-3">
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

export default UserLikeContents;