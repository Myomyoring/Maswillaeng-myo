import { Link } from 'react-router-dom';

import Logo from './Logo';
import { useAuth } from '../../context/ProvideAuthContext';

import { styled } from 'styled-components';
import tw from 'twin.macro';
import SearchIcon from '../../statics/svg/search_icon';

const HeaderStyle = styled.header`
  ${tw`h-20
       px-3
       flex justify-between items-center
       border-solid border-t-4
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
  const { currentUser, signOut } = useAuth();
  const user = currentUser();

  const handleSignOut = () => {
    signOut();
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
            <Link to={'/'}>Board</Link>
          </li>
          {user ? (
            <>
              <li>
                <Link to={`user/${user.nickname}`}>My Page</Link>
              </li>
              <li>
                <button onClick={handleSignOut}>Sign Out</button>
              </li>
            </>
          ) : (
            <li>
              <Link to={`signIn`}>Sign In</Link>
            </li>
          )}
        </ul>
      </Nav>
    </HeaderStyle>
  );
}
