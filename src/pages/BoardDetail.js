import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AiOutlineHeart, AiOutlineDelete, AiFillHeart } from "react-icons/ai";
import { FiShare, FiEdit2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Comments from "../components/boardDetail/Comments";
// material
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const BoardDetail = () => {
  let token = localStorage.getItem("accessToken");
  // URL 파라미터 받기 -board의 id
  const { postId } = useParams();

  const navigate = useNavigate();
  // const [userImage, setUserImage] = useState("/img/user.jpg");
  // const [show, setShow] = useState(false);
  // 게시글 정보
  const [post, setPost] = useState([]);
  // 게시글 댓글 정보
  const [postComment, setPostComment] = useState([]);

  // token
  // const token = localStorage.getItem("accessToken");
  // 삭제 modal이 보이는 여부 상태
  const [open, setOpen] = useState(false);
  // 좋아요 상태
  const [liked, setLiked] = useState(false);
  // 좋아요 count
  // const [likedCount, setLikedCount] = useState(0);
  // date 형태 변경
  const date = new Date(post.createdDate);
  const formattedDate = date.toLocaleString();

  const getPost = async () => {
    try {
      const { data } = await axios.get(`/api/post/${postId}`);
      // 확인용
      setPost(data);
      setPostComment(data.commentList);
    } catch (error) {
      console.error(error);
    }
  };

  // post가져오기
  useEffect(() => {
    getPost();
  }, [postId]);

  //modal 열기
  const handleClickOpen = () => {
    setOpen(true);
  };

  //modal 닫기
  const handleClose = () => {
    setOpen(false);
  };

  // url 복사
  const handleCopyClipBoard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      alert("클립보드에 링크가 복사되었어요.");
    } catch (err) {
      console.log(err);
    }
  };

  // 링크 복붙
  const handleClick = (event) => {
    const baseUrl = "http://localhost:8080";
    const pathname = window.location.pathname;
    const url = baseUrl + pathname;
    handleCopyClipBoard(url);
    console.log(url);
  };

  // 좋아요 추가
  const handleLike = async () => {
    try {
      let response = await axios.post(`/api/like/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setLiked(true);
      getPost();
      // setLikedCount(likedCount + 1);
    } catch (error) {
      setLiked(true);
      console.error(error);
    }
  };

  // 좋아요 삭제
  const deleteLike = async () => {
    try {
      await axios.delete(`/api/like/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      getPost();
      // setLikedCount(likedCount - 1);
      setLiked(false);
    } catch (error) {
      setLiked(false);
      console.error(error);
    }
  };
  // 좋아요 삭제
  const deleteAdd = async () => {
    try {
      await axios.delete(`/api/post/${postId}`);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="mx-auto max-w-4xl py-24 ">
        <div className=" mb-10 flex items-center justify-between">
          <div>
            <h2 className="mb-2 font-bold text-red-500">{post.category}</h2>
            <div className="mb-2 text-2xl font-black">{post.title}</div>
            <div>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 border-2 rounded-full overflow-hidden">
                  <img src={post.thumbnail} className="w-10 h-10" alt="" />
                </div>
                <div className="font-bold relative ">{post.nickname}</div>
                <div className="w-0.5 h-5 bg-gray-200 after:absolute after:inset-0 after:content after:''"></div>
                <div className="text-slate-400 text-s">{formattedDate}</div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 text-2xl"></div>
        </div>
        <div className="mb-5 h-96 border-2 p-10 bg-white"> {post.content}</div>

        <div className="select flex">
          <div className="ml-auto justify-between flex text-red-500 mb-10 rounded-full border border-red-500 py-3 px-3 align-middle text-xl gap-5">
            <div onClick={handleClick}>
              <FiShare />
            </div>
            <span
              onClick={() => {
                navigate(`/boardEdit/${postId}`);
              }}
            >
              <FiEdit2 />
            </span>
            <button onClick={deleteAdd}>
              <AiOutlineDelete />
            </button>
          </div>
        </div>
        <button className="delete-button" onClick={handleClickOpen}>
          삭제
        </button>
        <div onClick={handleClick}>
          <FiShare />
        </div>
        <span
          onClick={() => {
            navigate(`/boardEdit/${postId}`);
          }}
        >
          <FiEdit2 />
        </span>
        <button onClick={deleteAdd}>
          <AiOutlineDelete />
        </button>

        <div>
          {liked ? (
            <AiFillHeart onClick={deleteLike} />
          ) : (
            <AiOutlineHeart onClick={handleLike} />
          )}
        </div>

        <div>{post.likeCnt}</div>
        <Comments postId={postId} postComment={postComment} />
      </div>
      <Dialog
        open={open}
        // TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Use Google's location service?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Let Google help apps determine location. This means sending
            anonymous location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <button onClick={handleClose}>Disagree</button>
          <button onClick={handleClose}>Agree</button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default BoardDetail;
