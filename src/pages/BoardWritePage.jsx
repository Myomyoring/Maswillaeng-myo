import React from 'react'; // eslint-disable-line no-unused-vars
import ReactQuill from 'react-quill';
import { styled } from 'styled-components';
import tw from 'twin.macro';

const BoardWriteContainer = styled.div`
  ${tw`
        w-2/3 h-full
        m-auto py-20
    `}
`;

const TitleBox = styled.div`
  ${tw`
        w-full
        flex
    `}
  * {
    ${tw`
        mx-4
    `}
  }
`;

const CategorySelector = styled.select`
  ${tw`
    p-3 
    font-semibold text-center text-white bg-point
    border-none
    `}
`;

const TitleInput = styled.input`
  ${tw`
        w-3/4
        px-3
        bg-white
        border-solid border-gray
    `}
`;

export default function BoardWritePage() {
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
      <div>
        <ReactQuill />
      </div>
      <button>글 게시</button>
    </BoardWriteContainer>
  );
}
