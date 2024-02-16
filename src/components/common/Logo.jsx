import { Link } from 'react-router-dom';

import * as S from './styles/Logo.style';

export default function Logo({ color, size }) {
  return (
    <S.LogoStyle>
      <Link to={'/'}>
        <S.Text color={color} size={size}>
          Mashillaeng
        </S.Text>
      </Link>
    </S.LogoStyle>
  );
}
