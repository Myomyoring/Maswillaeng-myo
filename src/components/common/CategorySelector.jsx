import * as S from './styles/CategorySelector.style';

export default function CategorySelector({ categories, setTab, activeTabId }) {
  return (
    <S.CategorySelectorStyle
      value={activeTabId}
      onChange={(event) => {
        setTab(+event.target.value);
      }}
    >
      <S.CategoryOption value="">카테고리 선택</S.CategoryOption>
      {categories.map((category) => (
        <S.CategoryOption key={category.id} value={category.id}>
          {category.title}
        </S.CategoryOption>
      ))}
    </S.CategorySelectorStyle>
  );
}
