import Button from '../common/EventButton';

import styled from 'styled-components';
import tw from 'twin.macro';

const Buttons = styled.div`
  ${tw`
      p-2
      flex justify-center items-center
  `}
`;

export default function ButtonBox({ onPostSubmit }) {
  return (
    <Buttons>
      <Button onClick={onPostSubmit}>글 게시</Button>
    </Buttons>
  );
}
