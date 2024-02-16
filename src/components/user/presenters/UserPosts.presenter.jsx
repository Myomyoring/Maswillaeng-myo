import Pagination from '../../common/Pagination';

import * as S from '../styles/index';

export default function UserPostsPresenter({
  currentPage,
  lastPage,
  hidePrevButton,
  hideNextButton,
  onPageChange,
  children,
}) {
  return (
    <S.UserPostsStyle>
      {children}
      <Pagination
        currentPage={currentPage}
        lastPage={lastPage}
        hidePrevButton={hidePrevButton}
        hideNextButton={hideNextButton}
        onChange={onPageChange}
      />
    </S.UserPostsStyle>
  );
}
