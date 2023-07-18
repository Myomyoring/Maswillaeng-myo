import React from "react";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Editor from "../components/boardWrite/Editor";
import axios from "axios";

import CategorySelector from "../components/category/CategorySelector";

const BoardWrite = () => {
  // title Focus
  const titleInputRef = useRef(null);
  // 페이지 이동
  const navigate = useNavigate();
  // content Focus
  const contentEditorRef = useRef(null);
  // editor
  const editorRef = useRef();
  // 글 카테고리
  let categories = [
    { id: 0, name: "RECIPE" },
    { id: 1, name: "COCKTAIL" },
    { id: 2, name: "ETC" },
  ];

  // editor content
  let [posting, setPosting] = useState({
    title: "",
    content: "",
    category: "",
    thumbnail: "",
  });
  let { title, content, category, thumbnail } = posting;
  // title 작성
  const onTitleHandler = (e) => {
    setPosting((prevState) => ({
      ...prevState,
      title: e.target.value,
    }));
  };
  // content와 thumbnail담기
  const handleContentChange = (value) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(value, "text/html");
    const imgs = doc.querySelectorAll("img");
    const src = imgs.length > 0 ? imgs[0].getAttribute("src") : null;

    setPosting((prevState) => ({
      ...prevState,
      content: value,
      thumbnail: src,
    }));
  };

  // 카테고리 선택
  const handleSelect = (categories) => {
    setPosting((prevPosting) => ({
      ...prevPosting,
      category: categories,
    }));
  };

  // 게시글데이터 전송
  const postingSubmitData = async (e) => {
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("category", category);
      formData.append("thumbnail", thumbnail);
      let accessToken = localStorage.getItem("accessToken");
      let refreshToken = localStorage.getItem("refreshToken");
      const response = await axios.post("/api/post", formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
        data: { grant_type: "refresh_token", refresh_token: refreshToken },
      });
      console.log(response.data);
      if (response.data) {
        let postId = response.data;
        setPosting({
          title: "",
          content: "",
          category: "",
          thumbnail: "",
        });

        navigate(`/Board/${postId}`);
      }

      // 게시물 등록이 성공하면 posting 상태를 초기화
    } catch (error) {
      console.log(error);
      alert("게시물을 저장하는 도중 오류가 발생하였습니다.");
    }
  };

  //  글작성 데이터 전송
  const onSubmitHandler = (e) => {
    console.log(posting);
    e.preventDefault();

    if (!title.trim()) {
      return titleInputRef.current.focus();
    }

    if (category === "") {
      alert("카테고리를 선택해주세요");
      return;
    }
    if (!content.trim()) {
      return contentEditorRef.current.querySelector(".ql-editor").focus();
    }
    postingSubmitData();
  };

  return (
    <div className="max-w-4xl mx-auto py-24 relative">
      <div className="relative">
        <div className="mx-auto w-5/6 mb-10 flex ">
          <CategorySelector categories={categories} onSelect={handleSelect} />
          <input
            className="border border-red-500 ml-5 p-2 px-2 w-full"
            type="text"
            name="title"
            onChange={onTitleHandler}
            value={posting.title}
            placeholder="제목"
            ref={titleInputRef}
          />
        </div>
        <div ref={contentEditorRef}>
          <Editor
            forwardedRef={editorRef}
            onChange={handleContentChange}
            content={posting.content}
            setContent={setPosting.content}
            thumbnail={posting.thumbnail}
            setThumbnail={setPosting.thumbnail}
          />
        </div>
      </div>
      <div className="flex justify-center gap-20 ">
        <button
          onClick={onSubmitHandler}
          className="block bg-red-500 px-20 py-3 mt-28 font-bold text-white"
        >
          글 게시
        </button>
      </div>
    </div>
  );
};

export default BoardWrite;
