import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import styled from 'styled-components';
import tw from 'twin.macro';

const EditorStyle = styled.div`
  ${tw`
     py-3
  `}

  .ql-editor {
    ${tw`
        desktop:h-96
        tablet:h-[600px]
        mobile:h-[340px]
      `}
  }
`;

export default function EditorPresenter({ modules, quillRef, editorValue, changeEditorValue }) {
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
