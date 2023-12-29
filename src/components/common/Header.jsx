import { Link } from 'react-router-dom';

import { useAuth } from '../../context/ProvideAuthContext';
import Logo from './Logo';

import { styled } from 'styled-components';
import tw from 'twin.macro';
import SearchIcon from '../../statics/svg/search_icon';
import preparing from '../../utils/preparing';

const HeaderStyle = styled.header`
  ${tw`
      w-full h-20
      flex justify-between items-center
      border-solid border-t-[6px] border-b-[1px]

      mobile:px-2
    `}
  a,
  button {
    ${tw`
      font-extrabold
      desktop:text-md
      tablet:px-3
      mobile:px-1 text-xs
    `}
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
const LoginLink = styled(Link)`
  ${tw``}
`;
const MyPageLink = styled(Link)`
  ${tw``}
`;
const LogOutButton = styled.button`
  ${tw``}
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
                <MyPageLink to={`/user/${user.nickname}`}>My Page</MyPageLink>
              </Li>
              <Li>
                <LogOutButton onClick={LogOutHandler}>Log Out</LogOutButton>
              </Li>
            </>
          ) : (
            <Li>
              <LoginLink to={`/logIn`}>Log In</LoginLink>
            </Li>
          )}
        </Ul>
      </Nav>
    </HeaderStyle>
  );
}
