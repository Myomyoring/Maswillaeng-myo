import { Link } from 'react-router-dom';

import { useAuth } from '../../contexts/ProvideAuthContext';
import Logo from './Logo';
import preparing from '../../utils/preparing';

import * as S from './styles/Header.style';
import SearchIcon from '../../statics/svg/search_icon';

export default function Header() {
  const { currentUser, logOut } = useAuth();
  const user = currentUser();

  const onLogOut = () => {
    logOut();
    alert('로그아웃 완료');
  };

  return (
    <S.HeaderStyle>
      <Logo />
      <S.Nav>
        <S.Ul>
          <S.Li onClick={preparing}>
            <SearchIcon />
          </S.Li>
          <S.Li>
            <Link to={`/`}>Board</Link>
          </S.Li>
          {user ? (
            <>
              <S.Li>
                <S.MyPageLink to={`/user/${user.nickname}`}>My Page</S.MyPageLink>
              </S.Li>
              <S.Li>
                <S.LogOutButton onClick={onLogOut}>Log Out</S.LogOutButton>
              </S.Li>
            </>
          ) : (
            <S.Li>
              <S.LoginLink to={`/logIn`}>Log In</S.LoginLink>
            </S.Li>
          )}
        </S.Ul>
      </S.Nav>
    </S.HeaderStyle>
  );
}
