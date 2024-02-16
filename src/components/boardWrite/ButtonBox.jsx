import Button from '../common/EventButton';

import * as S from './styles/ButtonBox.style';

export default function ButtonBox({ onSubmit }) {
  return (
    <S.ButtonBoxStyle>
      <Button onClick={onSubmit}>글 게시</Button>
    </S.ButtonBoxStyle>
  );
}
