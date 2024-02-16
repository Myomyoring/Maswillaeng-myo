import CategoryTabBody from './CategoryTabBody';
import CategoryTabItem from './CategoryTabItem';

import * as S from '../styles/CategoryTab.style';

export default function CategoryTab({ activeTabId, categories, setTab }) {
  return (
    <S.CategoryTabStyle>
      <CategoryTabBody size={categories.length}>
        <CategoryTabItem categories={categories} activeTabId={activeTabId} setTab={setTab} />
      </CategoryTabBody>
    </S.CategoryTabStyle>
  );
}
