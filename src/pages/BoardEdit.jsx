import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Editor from "../components/boardWrite/Editor";
import axios from "axios";

import CategorySelector from "../components/category/CategorySelector";

const BoardEdit = () => {
  // URL 파라미터 받기 -board의 id
  const { postId } = useParams();
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
    { id: 1, name: "COCKTAIL / SNACK" },
    { id: 2, name: "ETC" },
  ];

  // editor content
  let [posting, setPosting] = useState({
    title: "",
    content: "",
    category: "",
    thumbnail: "",
  });
  // post가져오기
  useEffect(() => {
    const getPost = async () => {
      try {
        const { data } = await axios.get(`/api/post/${postId}`);
        setPosting(data);
      } catch (error) {
        console.error(error);
      }
    };
    getPost();
  }, [postId]);
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

  // 글 수정하기
  const postingSubmitData = async () => {
    let { title, content, category, thumbnail } = posting;
    try {
      await axios.put(`/api/post/${postId}`, posting);
      // 이전 페이지로 돌아가기
      window.location.href = `/`;
    } catch (e) {
      // 서버에서 받은 에러 메시지 출력
      console.log(e);
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
          수정완료
        </button>
      </div>
    </div>
  );
};

export default BoardEdit;
