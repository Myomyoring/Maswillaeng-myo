import { Link } from 'react-router-dom';

import { useAuth } from '../../context/ProvideAuthContext';
import Logo from './Logo';

import { styled } from 'styled-components';
import tw from 'twin.macro';
import SearchIcon from '../../statics/svg/search_icon';
import { authService } from '../../firebase-config';

const HeaderStyle = styled.header`
  ${tw`h-20
       px-3
       flex justify-between items-center
       border-solid border-t-4 border-b-[1px]
    `}
  a,
  button {
    ${tw`px-4 font-extrabold`}
  }
`;
const Nav = styled.nav`
  ul {
    ${tw`flex`}
  }
`;

export default function Header() {
  const { currentUser } = useAuth();
  const user = currentUser();
  const { logOut } = useAuth();

  const LogOutHandler = () => {
    logOut();
    alert('로그아웃 완료');
  };

  return (
    <HeaderStyle>
      <Logo />
      <Nav>
        <ul>
          <li>
            <SearchIcon />
          </li>
          <li>
            <Link to={`/`}>Board</Link>
          </li>
          {user ? (
            <>
              <li>
                <Link to={`/user/${user.nickname}`}>My Page</Link>
              </li>
              <li>
                <button onClick={LogOutHandler}>Log Out</button>
              </li>
            </>
          ) : (
            <li>
              <Link to={`/logIn`}>Log In</Link>
            </li>
          )}
        </ul>
      </Nav>
    </HeaderStyle>
  );
}
