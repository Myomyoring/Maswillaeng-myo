import * as S from '../styles/CategoryTab.style';

export default function CategoryTabItem({ categories, activeTabId, setTab }) {
  return (
    <>
      {categories
        ? categories.map((category) => (
            <S.Li
              className={category.id === activeTabId ? 'active' : ''}
              key={category.id}
              onClick={() => setTab(category.id)}
            >
              <S.TitleText>{category.title}</S.TitleText>
            </S.Li>
          ))
        : null}
    </>
  );
}
