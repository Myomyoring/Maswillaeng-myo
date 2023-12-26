import BoardHeader from '../BoardHeader';
import Card from '../../common/Card';
import CategoryTab from '../../common/CategoryTab';
import Pagination from '../../common/Pagination';
import CategorySelector from '../../common/CategorySelector';

export default function PostListPresenter({ categories, tab, setTab, list, page, currentPage, lastPage }) {
  return (
    <>
      <CategoryTab categories={categories} active={tab} setTab={setTab} />
      <CategorySelector categories={categories} active={tab} setTab={setTab} />
      <BoardHeader />
      <Card posts={list} />
      <Pagination
        page={page}
        count={lastPage}
        hidePrevButton={page < 10}
        hideNextButton={(page + 1) / 10 < 1}
        onChange={currentPage}
      />
    </>
  );
}
