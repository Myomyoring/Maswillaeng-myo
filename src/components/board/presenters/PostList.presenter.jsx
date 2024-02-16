import BoardHeader from '../BoardHeader';
import CategorySelector from '../../common/CategorySelector';
import CategoryTab from '../../common/CategoryTab/CategoryTab';

import * as S from '../style/PostList.style';

export default function PostListPresenter({ categories, tab, setTab, children }) {
  return (
    <S.PostListStyle>
      <CategoryTab categories={categories} activeTabId={tab} setTab={setTab} />
      <S.Div>
        <CategorySelector categories={categories} activeTabId={tab} setTab={setTab} />
        <BoardHeader />
      </S.Div>
      {children}
    </S.PostListStyle>
  );
}
