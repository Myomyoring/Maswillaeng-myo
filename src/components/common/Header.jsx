import { Link } from 'react-router-dom';

import { useAuth } from '../../context/ProvideAuthContext';
import Logo from './Logo';

import { styled } from 'styled-components';
import tw from 'twin.macro';
import SearchIcon from '../../statics/svg/search_icon';
import preparing from '../../utils/preparing';

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
const Ul = styled.ul`
  ${tw``}
`;
const Li = styled.li`
  ${tw`
    cursor-pointer
  `}
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
        <Ul>
          <Li onClick={() => preparing()}>
            <SearchIcon />
          </Li>
          <Li>
            <Link to={`/`}>Board</Link>
          </Li>
          {user ? (
            <>
              <Li>
                <Link to={`/user/${user.nickname}`}>My Page</Link>
              </Li>
              <Li>
                <button onClick={LogOutHandler}>Log Out</button>
              </Li>
            </>
          ) : (
            <Li>
              <Link to={`/logIn`}>Log In</Link>
            </Li>
          )}
        </Ul>
      </Nav>
    </HeaderStyle>
  );
}
