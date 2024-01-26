import styled from 'styled-components';
import tw from 'twin.macro';

const CategorySelectorStyle = styled.select`
  ${tw`
      p-3 
      font-semibold text-center text-white bg-point
      border-none

      desktop:hidden
      tablet:hidden
      mobile:block
    `}
`;

export default function CategorySelector({ categories, setTab, activeTabId }) {
  return (
    <CategorySelectorStyle
      value={activeTabId}
      onChange={(e) => {
        setTab(+e.target.value);
      }}
    >
      <option value="">카테고리 선택</option>
      {categories.map((category) => (
        <option key={category.id} value={category.id}>
          {category.title}
        </option>
      ))}
    </CategorySelectorStyle>
  );
}
