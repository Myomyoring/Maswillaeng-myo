import * as S from '../styles/CategoryTab.style';

export default function CategoryTabBody({ size, children }) {
  return <S.Ul className={size === 2 ? 'user_page' : 'board_page'}>{children ? children : null}</S.Ul>;
}
