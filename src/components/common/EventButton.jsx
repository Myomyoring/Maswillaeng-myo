import * as S from './styles/Buttons.style';

export default function EventButton({ children, onClick, ...rest }) {
  return <S.EventButtonStyle {...{ onClick, ...rest }}>{children}</S.EventButtonStyle>;
}
