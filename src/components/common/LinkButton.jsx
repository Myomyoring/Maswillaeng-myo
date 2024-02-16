import * as S from './styles/Buttons.style';

export default function LinkButton({ children, to }) {
  return <S.LinkButtonStyle {...{ to }}>{children}</S.LinkButtonStyle>;
}
