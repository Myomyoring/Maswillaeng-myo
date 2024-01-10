import Card from '../../common/Card';

import styled from 'styled-components';
import tw from 'twin.macro';

const UserPostsStyle = styled.div`
  ${tw`
      overflow-hidden
  `}
`;

export default function UserPostsPresenter({ posts, guide }) {
  return (
    <UserPostsStyle>
      <Card {...{ posts, guide }} small={true} />
    </UserPostsStyle>
  );
}
