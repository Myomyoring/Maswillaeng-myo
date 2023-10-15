import Card from '../../board/Card';

import styled from 'styled-components';
import tw from 'twin.macro';

const ContentsStyle = styled.div`
  ${tw`
    h-screen
    text-center
    overflow-hidden
  `}
`;

export default function UserContentsPresenter({ posts, guide }) {
  return (
    <ContentsStyle>
      <Card {...{ posts, guide }} />
    </ContentsStyle>
  );
}
