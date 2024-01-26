import BoardHeader from '../BoardHeader';
import Card from '../../common/Card';
import CategoryTab from '../../common/CategoryTab';
import Pagination from '../../common/Pagination';
import CategorySelector from '../../common/CategorySelector';
import LoadingScreen from '../../common/LoadingScreen';

import * as S from '../style/PostList.style';

export default function PostListPresenter({
  categories,
  tab,
  setTab,
  posts,
  currentPage,
  onPageChange,
  lastPage,
  hidePrevButton,
  hideNextButton,
  isLoading,
}) {
  return (
    <S.PostListStyle>
      <CategoryTab categories={categories} activeTabId={tab} setTab={setTab} />
      <S.Div>
        <CategorySelector categories={categories} activeTabId={tab} setTab={setTab} />
        <BoardHeader />
      </S.Div>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <>
          <Card posts={posts} />
          <Pagination
            currentPage={currentPage}
            lastPage={lastPage}
            hidePrevButton={hidePrevButton}
            hideNextButton={hideNextButton}
            onChange={onPageChange}
          />
        </>
      )}
    </S.PostListStyle>
  );
}
