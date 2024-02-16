import * as S from './styles/Buttons.style';

export default function FormButton({ children, ...rest }) {
  return <S.FormButtonStyle {...rest}>{children}</S.FormButtonStyle>;
}
