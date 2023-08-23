import React, { useState } from 'react'; // eslint-disable-line no-unused-vars
import { styled } from 'styled-components';
import tw from 'twin.macro';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';

import { AuthContext } from '../auth/ProvideAuthContext';

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
  const { getUserToken } = AuthContext();
  const [postForm, setPostForm] = useState({
    category: '',
    title: '',
    content: '',
    thumbnail: '',
  });
  const { category, title, content, thumbnail } = postForm;

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setPostForm({ ...postForm, [name]: value });
    console.log(postForm);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const post = new FormData();
    post.append('title', title);
    post.append('content', content);
    post.append('category', category);
    post.append('thumbnail', thumbnail);

    console.log(post);
    try {
      const token = getUserToken();
      if (!token) return;

      const response = await axios.post('/api/post', post, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <BoardWriteContainer>
      <TitleBox>
        <span>
          <CategorySelector>
            <option value="">카테고리 선택</option>
            <option value="recipe">RECIPE</option>
            <option value="cocktail">COCKTAIL / SNACK</option>
            <option value="etc">ETC</option>
          </CategorySelector>
        </span>
        <TitleInput
          type="text"
          name="title"
          value={title}
          onChange={handleChange}
          placeholder="제목을 입력해주세요 ."
        />
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
        <Button onClick={onSubmitHandler}>글 게시</Button>
      </ButtonBox>
    </BoardWriteContainer>
  );
}
