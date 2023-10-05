import BoardHeader from '../BoardHeader';
import Card from '../Card';
import CategoryTab from '../../common/CategoryTab';
import Pagination from '../../common/Pagination';

export default function PostListPresenter({ categories, tab, setTab, list, page, currentPage, lastPage }) {
  return (
    <>
      <CategoryTab active={tab} categories={categories} setTab={setTab} />
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
