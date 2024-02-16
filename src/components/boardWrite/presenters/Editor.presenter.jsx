import ReactQuill from 'react-quill';

import 'react-quill/dist/quill.snow.css';
import * as S from '../styles/index';

export default function EditorPresenter({ modules, quillRef, editorValue, onChange }) {
  return (
    <S.EditorStyle>
      <ReactQuill
        theme="snow"
        modules={modules}
        ref={quillRef}
        value={editorValue}
        onChange={onChange}
        placeholder="글을 입력해주세요 ."
      />
    </S.EditorStyle>
  );
}
