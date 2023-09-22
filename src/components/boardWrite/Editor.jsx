import { useMemo, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import styled from 'styled-components';
import tw from 'twin.macro';
import { uploadService } from '../../services/upload.service';

const EditorStyle = styled.div`
  ${tw`
     py-3
  `}

  .ql-editor {
    ${tw`h-96`}
  }
`;

export default function Editor({ editorValue, setEditorValue, imageList, setThumbnail, token }) {
  const quillRef = useRef(null);
  const changeEditorValue = (quillValue) => {
    setEditorValue(quillValue);
  };
  const imageHandler = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');

    input.onchange = async () => {
      const file = input.files[0];
      const formData = new FormData();
      formData.append('photo', file);

      try {
        if (!token) return;
        const response = await uploadService.setImage({ formData, token });
        imageList.push(response.data.img);
        setThumbnail(imageList);

        const range = quillRef.current.getEditor().getSelection();
        quillRef.current.getEditor().insertEmbed(range.index, 'image', response.data.img);
        input.value = '';
      } catch (error) {
        console.log(error);
      }
    };

    input.click();
  };

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          ['bold', 'italic', 'underline', 'strike'],
          ['link'],
          [
            {
              color: [
                '#000000',
                '#e60000',
                '#ff9900',
                '#ffff00',
                '#008a00',
                '#0066cc',
                '#9933ff',
                '#ffffff',
                '#facccc',
                '#ffebcc',
                '#ffffcc',
                '#cce8cc',
                '#cce0f5',
                '#ebd6ff',
                '#bbbbbb',
                '#f06666',
                '#ffc266',
                '#ffff66',
                '#66b966',
                '#66a3e0',
                '#c285ff',
                '#888888',
                '#a10000',
                '#b26b00',
                '#b2b200',
                '#006100',
                '#0047b2',
                '#6b24b2',
                '#444444',
                '#5c0000',
                '#663d00',
                '#666600',
                '#003700',
                '#002966',
                '#3d1466',
                'custom-color',
              ],
            },
          ],
          ['image'],
        ],
        handlers: {
          image: imageHandler,
        },
      },
    }),
    [],
  );
  return (
    <EditorStyle>
      <ReactQuill
        theme="snow"
        modules={modules}
        ref={quillRef}
        value={editorValue}
        onChange={changeEditorValue}
        placeholder="글을 입력해주세요 ."
      />
    </EditorStyle>
  );
}
