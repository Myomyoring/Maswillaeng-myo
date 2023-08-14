import React from 'react'; // eslint-disable-line no-unused-vars
import { styled } from 'styled-components';
import tw from 'twin.macro';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const BoardWriteContainer = styled.div`
  ${tw`
        w-2/3 h-full
        m-auto py-20
    `}
`;

const TitleBox = styled.div`
  ${tw`
        w-full
        flex justify-between
    `}
  * {
    ${tw`
        
    `}
  }
`;

const CategorySelector = styled.select`
  ${tw`
    w-auto
    p-3 
    font-semibold text-center text-white bg-point
    border-none
    `}
`;

const TitleInput = styled.input`
  ${tw`
        w-4/5
        px-3
        bg-white
        border-solid border-gray
    `}
`;

const Editor = styled.div`
  ${tw`
      py-3
  `}
  .ql-editor {
    ${tw`
        h-96
      `}
  }
`;

const ButtonBox = styled.div`
  ${tw`
      p-2
      flex justify-center items-center
  `}
`;

const Button = styled.button`
  ${tw`
        mx-2 p-3
      bg-point
        font-bold text-white text-sm
        cursor-pointer
    `}
`;

export default function BoardWritePage() {
  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],

        [{ align: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ list: 'ordered' }, { list: 'bullet' }, 'link'],
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
          { background: [] },
        ],
        ['image', 'video'],
      ],
    },
  };
  const formats = [
    //'font',
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'align',
    'color',
    'background',
  ];
  return (
    <BoardWriteContainer>
      <TitleBox>
        <span>
          <CategorySelector>
            <option value="">카테고리 선택</option>
            <option>RECIPE</option>
            <option>COCKTAIL / SNACK</option>
            <option>ETC</option>
          </CategorySelector>
        </span>
        <TitleInput type="text" placeholder="제목을 입력해주세요 ." />
      </TitleBox>
      <Editor>
        <ReactQuill
          theme="snow"
          modules={modules}
          formats={formats}
          placeholder="글을 입력해주세요 ."
        />
      </Editor>
      <ButtonBox>
        <Button>임시 저장</Button>
        <Button>글 게시</Button>
      </ButtonBox>
    </BoardWriteContainer>
  );
}
