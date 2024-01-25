import BoardHeader from '../BoardHeader';
import Card from '../../common/Card';
import CategoryTab from '../../common/CategoryTab';
import Pagination from '../../common/Pagination';
import CategorySelector from '../../common/CategorySelector';

import { PostListStyle } from '../style/PostList.style';

export default function PostListPresenter({
  categories,
  tab,
  setTab,
  posts,
  currentPage,
  onPageChange,
  lastPage,
  isLoading,
}) {
  return (
    <PostListStyle>
      <CategoryTab categories={categories} active={tab} setTab={setTab} />
      <CategorySelector categories={categories} active={tab} setTab={setTab} />
      <BoardHeader />
      {isLoading ? (
        '로딩 중...'
      ) : (
        <>
          <Card posts={posts} />
          <Pagination
            lastPage={lastPage}
            hidePrevButton={currentPage < 10}
            hideNextButton={(currentPage + 1) / 10 < 1}
            onChange={onPageChange}
          />
        </>
      )}
    </PostListStyle>
  );
}
