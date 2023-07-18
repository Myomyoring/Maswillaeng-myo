import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
// axios
import axios from "axios";
import { useMemo, useRef, useState } from "react";

const Editor = ({ onChange, content, thumbnail, setThumbnail }) => {
  const quillRef = useRef();
  let [imgUrl, setImgUrl] = useState("");
  const imageHandler = () => {
    console.log("핸들러시작");

    const input = document.createElement("input");

    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
    input.addEventListener("change", async () => {
      console.log("온체인지");
      const file = input.files[0];

      const formData = new FormData();
      formData.append("photo", file);
      console.log(formData);
      try {
        let accessToken = localStorage.getItem("accessToken");
        let refreshToken = localStorage.getItem("refreshToken");
        const response = await axios.post("/api/post/upload", formData, {
          headers: {
            Authorization: `Bearer ${accessToken}`,

            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
          data: { grant_type: "refresh_token", refresh_token: refreshToken },
        });
        console.log("성공 시, 백엔드가 보내주는 데이터", response.data.img);
        const IMG_URL = response.data.img;

        const editor = quillRef.current.getEditor();
        const range = editor.getSelection();
        editor.insertEmbed(range.index, "image", IMG_URL);
        // img 경로 썸네일로 보내는 코드
        // setThumbnail((prevState) => ({
        //   ...prevState,
        //   thumbnail: IMG_URL,
        // }));
      } catch (error) {
        console.log("실패");
      }
    });
  };
  const handleChange = (content, delta, source, editor) => {
    const images = [];
    delta.ops.forEach((op) => {
      if (op.insert && typeof op.insert === "object" && op.insert.image) {
        images.push(op.insert.image);
      }
    });
    onChange(content, imgUrl);
  };

  const modules = useMemo(() => {
    return {
      toolbar: {
        container: [
          [{ header: [1, 2, 3, 4, 5, 6, false] }],

          [{ align: [] }],
          ["bold", "italic", "underline", "strike", "blockquote"],
          [{ list: "ordered" }, { list: "bullet" }, "link"],
          [
            {
              color: [
                "#000000",
                "#e60000",
                "#ff9900",
                "#ffff00",
                "#008a00",
                "#0066cc",
                "#9933ff",
                "#ffffff",
                "#facccc",
                "#ffebcc",
                "#ffffcc",
                "#cce8cc",
                "#cce0f5",
                "#ebd6ff",
                "#bbbbbb",
                "#f06666",
                "#ffc266",
                "#ffff66",
                "#66b966",
                "#66a3e0",
                "#c285ff",
                "#888888",
                "#a10000",
                "#b26b00",
                "#b2b200",
                "#006100",
                "#0047b2",
                "#6b24b2",
                "#444444",
                "#5c0000",
                "#663d00",
                "#666600",
                "#003700",
                "#002966",
                "#3d1466",
                "custom-color",
              ],
            },
            { background: [] },
          ],
          ["image", "video"],
          ["clean"],
        ],
        handlers: {
          // 이미지 처리는 우리가 직접 imageHandler라는 함수로 처리할 것이다.
          image: imageHandler,
        },
      },
    };
  }, []);
  const formats = [
    //'font',
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "align",
    "color",
    "background",
  ];

  return (
    <div>
      {" "}
      <ReactQuill
        placeholder="내용을 입력해주세요"
        className="w-5/6  mx-auto h-96"
        theme="snow"
        modules={modules}
        formats={formats}
        value={content || ""}
        ref={quillRef}
        onChange={handleChange}
      />
    </div>
  );
};

export default Editor;
