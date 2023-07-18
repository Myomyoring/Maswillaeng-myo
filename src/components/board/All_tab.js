import React, {useEffect, useState} from "react";
import {Link, useLocation, useNavigate, useParams} from "react-router-dom";
import {Pagination} from "@mui/material";
import axios from "axios";
import {displayCreatedAt} from "../../function/Board_api";

const AllTab = () => {
    // 게시물 데이터
    const [allList, setAllList] = useState([]);
    // 로딩 상태
    const [loading, setLoading] = useState(false);
    // 좋아요 리스트
    const [likes, setLikes] = useState([])

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
        setPage(value - 1)
        setFirstPost(value)
    }
    // page가 변경 될 때마다 서버에 데이터 요청
    useEffect(() => {
        setLoading(true)
        const ListData = async () => {
            const postRes = await axios.get(`api/post/posts/${page}`)
            const LikeMatch = await Promise.all(postRes.data.content.map((item) => axios.get(`api/post/${item.id}`)));
            const likes = LikeMatch.map((res) => res.data.likeCnt);
            setLikes(likes);

            return postRes.data;
        }
        ListData()
            .then((posts) => {
                setAllList(posts.content)
                setTotalPostCount(posts.totalElements) // 전체 게시물 갯수
                setLastPost(posts.totalPages) // 총 페이지 수
            })
            .catch((err) => console.log("게시물 리스트 에러 " + err))
        setLoading(false)
    }, [page])

    return (
        <>
            {/* 게시물 수 확인 용 */}
            <span className="m-auto">총
                <span className="text-red-500 text-lg font-bold">{totalPostCount}</span>개 글이 있습니다
            </span>
            <div className="flex flex-col">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg p-2">
                            <div className="flex w-full h-11 border-b-2 border-black">
                                {/* 정렬 버튼 */}
                                {/*<div className="inline-flex flex-auto text-xs">*/}
                                {/*    <button className="mx-3 decoration-red">*/}
                                {/*        <span className="">●</span>*/}
                                {/*        최신순*/}
                                {/*    </button>*/}
                                {/*    <button className="mx-3">*/}
                                {/*        <span>●</span>*/}
                                {/*        추천순*/}
                                {/*    </button>*/}
                                {/*    <button className="mx-3">*/}
                                {/*        <span>●</span>*/}
                                {/*        조회순*/}
                                {/*    </button>*/}
                                {/*</div>*/}

                                {/* 검색, 글쓰기 버튼 */}
                                <div className="flex justify-end">
                                    <div className="text-lg bg-transparent text-gray-800">
                                        <button
                                            className="w-16 rounded-md mx-3 h-8 text-sm text-white font-bold bg-[#EA4E4E]">
                                            <Link to={"/BoardWrite"}>글쓰기</Link>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {loading && <div className="text-center text-3xl mt-5"> 로딩 중... </div>}

                            {/* 게시물 */}
                            <div className="mx-1 grid grid-cols-4">
                                {
                                    allList.map((item, idx) => (

                                        <div className="text-center p-5 h-auto" key={item.id}>
                                            <Link to={`/Board/${item.id}`}>
                                                <div className="h-52 overflow-hidden rounded-md">
                                                    <img
                                                        src={item.thumbnail === null ? item.thumbnail : "/img/board_thumbnail.png"}
                                                        className="m-auto w-52 h-52"/>
                                                </div>
                                                <div
                                                    className="font-bold my-3 overflow-hidden whitespace-nowrap text-ellipsis hover:text-[#EA4E4E]">
                                                    {item.title}
                                                </div>
                                            </Link>
                                            <div>
                                                <span className="text-sm pr-3">
                                                    <Link to={`/UserPage/${item.nickname}`}>
                                                    {item.nickname}
                                                    </Link>
                                                </span>
                                                {/*  creat_At  */}
                                                <span className="text-sm">
                                                    {displayCreatedAt(item.createdDate)}
                                                </span>
                                            </div>
                                            {/* 조회수..? */}
                                            <span className="text-sm pl-3">
                                                👀 9999
                                            </span>
                                            {/* 좋아요 */}
                                            <span className="text-sm pl-3">
                                                💗 {likes.filter((like, index) => index === idx) ? likes.filter((like, index) => index === idx) : "0"}
                                            </span>
                                            <div className="grid grid-cols-3">
                                                <span
                                                    className="bg-gray-200 rounded-md text-xs p-1 m-1 overflow-hidden whitespace-nowrap text-ellipsis ">
                                                  #해시태그
                                                </span>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
                {/* 페이지 네이션 */}
                <div className="my-5 m-auto text-2xl">
                    <Pagination
                        size="large"
                        page={firstPost}
                        count={lastPost}
                        hidePrevButton={page === 0}
                        hideNextButton={firstPost === lastPost}
                        onChange={currentPage}
                    />
                </div>
            </div>
        </>
    );
};

export default AllTab;