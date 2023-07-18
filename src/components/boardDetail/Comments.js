import React from "react";
import { useEffect, useState, useRef } from "react";
import { displayCreatedAt } from "../../function/Board_api";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Comments = ({ postId, postComment }) => {
  const navigate = useNavigate();
  const [comments, setComments] = useState(postComment);
  const [recomments, setReComments] = useState([]);
  const [selectedContent, setSelectedContent] = useState(""); // 선택한 댓글의 commentId 상태 추가

  // 입력한 댓글 내용
  const [commentContent, setCommentContent] = useState("");
  const [recommentContent, setRecommentContent] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [modifyIsOpen, setModifyIsOpen] = useState(false);

  const [textAreaHeight, setTextAreaHeight] = useState("auto"); // textarea 높이
  const textAreaRef = useRef(null); // textarea 레퍼런스
  let token = localStorage.getItem("accessToken");

  // 댓글 등록
  const comment = async (e) => {
    const comment = {
      postId: postId,
      content: commentContent,
    };

    try {
      await axios.post(`/api/comment`, comment, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      window.location.reload();
      setCommentContent("");
      setSelectedContent(comments.commentId);
    } catch (error) {
      console.log(error);
    }
  };

  const onCommentHandler = (e) => {
    setCommentContent(e.target.value);
  };

  useEffect(() => {
    if (textAreaRef.current) {
      // textarea의 scrollHeight 계산
      const scrollHeight = textAreaRef.current.scrollHeight;
      setTextAreaHeight(`${scrollHeight}px`);
    }
  }, [textAreaHeight, textAreaRef]);
  // textarea 자동조절
  const onChangeHandler = (event) => {
    const { target } = event;
    target.style.height = "auto";
    target.style.height = `${target.scrollHeight}px`;
    setTextAreaHeight(`${target.scrollHeight}px`);
    setRecommentContent(event.target.value);
  };

  const handleReplyClick = (commentId) => {
    if (selectedContent === commentId) {
      setIsOpen(!isOpen);
    } else {
      setSelectedContent(commentId);
      setIsOpen(true);
    }
  };
  const handleModifyClick = (commentId) => {
    if (selectedContent === commentId) {
      setModifyIsOpen(!modifyIsOpen);
    } else {
      setSelectedContent(commentId);
      setModifyIsOpen(true);
    }
  };
  // 대댓글 post
  const recomment = async (e) => {
    const comment = {
      parentId: selectedContent,
      content: recommentContent,
    };

    try {
      let { data } = await axios.post("/api/comment/reply", comment, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      setReComments(data);
      setRecommentContent("");
    } catch (error) {
      console.log(error);
    }
  };

  const getRecomment = async () => {
    try {
      const { data } = await axios.get(`/api/comment/reply/${selectedContent}`);
      // 확인용
      console.log(data);
      setReComments(data);
    } catch (error) {
      console.error(error);
    }
  };
  // recomment 가지고 오기
  useEffect(() => {
    if (selectedContent) {
      getRecomment();
    }
    console.log(recomments);
  }, [selectedContent]);

  // postComment 값이 변경될 때마다 comments 상태 업데이트
  useEffect(() => {
    setComments(postComment);
  }, [postComment]);
  // 댓글 삭제
  const deleteComment = async (commentId) => {
    await axios.delete(`/api/comment/${commentId}`);
    window.location.reload();
  };
  return (
    <div className="border-t-2 h-44 bg-slate-50 ">
      <div className="p-5 mb-10 text-right">
        <textarea
          placeholder="댓글을 작성해주세요"
          className="border p-3 w-full resize-none"
          onChange={onCommentHandler}
          value={commentContent}
        ></textarea>

        <div className="mt-5">
          {" "}
          <input type="radio" name="secret" className="mr-2 " />
          <span className="mr-7">비밀글</span>
          <button
            onClick={comment}
            className=" font-white h-9 flex-none bg-point px-7 font-bold bg-red-500 text-white"
          >
            {" "}
            등록
          </button>
        </div>
      </div>
      <div className="font-bold text-xl mb-5">
        댓글 {comments ? comments.length : 0}
      </div>
      {comments.map((item, id) => {
        return (
          <div key={id} className="bg-white  flex px-12 py-8 border-t-2">
            <div className="mr-5 h-10 w-10 border-2 rounded-full overflow-hidden">
              <img src={item.userImage} className="w-10 h-10" alt="" />
            </div>
            <div className="w-full">
              <div className="flex font-extrabold mb-3 gap-10">
                <div>{item.nickname}</div>
                <div className="text-red-500">
                  {" "}
                  {displayCreatedAt(item.createDate)}
                </div>
              </div>
              <div className="mb-3">{item.content}</div>
              <div>
                <div className="font-bold ">
                  {isOpen && selectedContent === item.commentId ? (
                    <div>
                      <textarea
                        placeholder="답글을 작성해주세요"
                        className="border p-1 w-full h-10 resize-none"
                        ref={textAreaRef}
                        onChange={onChangeHandler}
                        value={recommentContent}
                      ></textarea>
                      <button className="mb-3 mr-3" onClick={recomment}>
                        답글달기
                      </button>
                      <button className="mb-3" onClick={handleReplyClick}>
                        취소
                      </button>
                    </div>
                  ) : (
                    <div className="flex gap-3 justify-between">
                      <button
                        className="mb-3"
                        data-selected-content={item.commentId}
                        onClick={() => {
                          handleReplyClick(item.commentId);
                        }}
                      >
                        답글
                      </button>
                      {modifyIsOpen && selectedContent === item.commentId ? (
                        <div>
                          <textarea
                            placeholder="답글을 작성해주세요"
                            className="border p-1 w-full h-10 resize-none"
                            ref={textAreaRef}
                            onChange={onCommentHandler}
                            value={commentContent}
                          ></textarea>
                          <button
                            className="mb-3 mr-5"
                            onClick={() => {
                              handleModifyClick(item.commentId);
                            }}
                          >
                            완료
                          </button>
                        </div>
                      ) : (
                        <div>
                          <button
                            className="mb-3 mr-5"
                            onClick={() => {
                              handleModifyClick(item.commentId);
                            }}
                          >
                            수정
                          </button>
                          <button
                            className="mb-3"
                            onClick={() => {
                              deleteComment(item.commentId);
                            }}
                          >
                            삭제
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
              {recomments &&
                recomments.map((item, id) => {
                  return (
                    <div key={id} className="border-t-2 py-5 bg-gray-50">
                      <div className="w-full flex font-extrabold mb-3 ml-5 gap-5">
                        <div className=" h-10 w-10 border-2 rounded-full overflow-hidden">
                          <img
                            src={item.userImage}
                            className="w-10 h-10"
                            alt=""
                          />
                        </div>
                        <div>
                          <div>{item.nickname}</div>
                          <div className="text-red-500">
                            {displayCreatedAt(item.createDate)}
                          </div>
                          <div>{item.content}</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        );
      })}

      <button
        onClick={() => {
          navigate("/");
        }}
        className="float-right text-right my-10 font-white h-9 bg-point px-7 font-bold bg-red-500 text-white"
      >
        목록으로
      </button>
    </div>
  );
};

export default Comments;
