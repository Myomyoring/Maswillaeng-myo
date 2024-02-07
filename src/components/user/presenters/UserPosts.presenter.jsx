import Card from '../../common/Card';
import LoadingScreen from '../../common/LoadingScreen';

import Pagination from '../../common/Pagination';

import styled from 'styled-components';
import tw from 'twin.macro';

const UserPostsStyle = styled.div`
  ${tw`
      overflow-hidden
  `}
`;

export default function UserPostsPresenter({
  isLoading,
  posts,
  guide,
  currentPage,
  lastPage,
  hidePrevButton,
  hideNextButton,
  onPageChange,
}) {
  return (
    <UserPostsStyle>
      {isLoading ? <LoadingScreen /> : <Card {...{ posts, guide }} small={true} />}
      <Pagination
        currentPage={currentPage}
        lastPage={lastPage}
        hidePrevButton={hidePrevButton}
        hideNextButton={hideNextButton}
        onChange={onPageChange}
      />
    </UserPostsStyle>
  );
}
