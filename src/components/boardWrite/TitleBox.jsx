import styled from 'styled-components';
import tw from 'twin.macro';

const Title = styled.div`
  ${tw`
      w-full
      flex justify-between
    `}
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
      w-4/5
      px-3
    bg-white
      border-solid border-gray
    `}
`;

export default function TitleBox({ categories, onChange, category, title }) {
  return (
    <Title>
      <span>
        <CategorySelector name="category" onChange={onChange} value={category}>
          <option value="">카테고리 선택</option>
          {categories.map(
            (category) =>
              category.name !== '' && (
                <option key={category.id} value={category.name}>
                  {category.title}
                </option>
              ),
          )}
        </CategorySelector>
      </span>
      <TitleInput type="text" name="title" value={title} onChange={onChange} placeholder="제목을 입력해주세요 ." />
    </Title>
  );
}
