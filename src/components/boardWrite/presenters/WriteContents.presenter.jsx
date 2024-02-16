import { categories } from '../../../constants';
import ButtonBox from '../ButtonBox';
import TitleBox from '../TitleBox';

import * as S from '../styles/index';

export default function WriteContentsPresenter({ onSubmit, onChange, category, title, children }) {
  return (
    <S.WriteContentsStyle>
      <TitleBox {...{ categories, onChange, category, title }} />
      {children}
      <ButtonBox onSubmit={onSubmit} />
    </S.WriteContentsStyle>
  );
}
