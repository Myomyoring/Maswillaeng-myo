import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import tw from 'twin.macro';
import SearchIcon from '../../statics/svg/searchIcon';
import { AuthContext } from '../../auth/ProvideAuthContext';

const HeaderStyle = styled.header`
  ${tw`h-20 px-3
        flex justify-between items-center
        border-solid border-t-4
        font-extrabold
        `}

  & {
    div {
      ${tw`items-center`}
    }
    a,
    button {
      ${tw`no-underline px-4`}
    }
  }
`;

const Nav = styled.div`
  ${tw``}
`;

const Logo = styled(Link)`
  ${tw``}
`;
const Board = styled(Link)`
  ${tw``}
`;
const Mypage = styled.button`
  ${tw``}
`;
const Login = styled(Link)`
  ${tw``}
`;
const LogoutButton = styled.button`
  ${tw`
    
  `}
`;

export default function Header() {
  const { signOut, currentUser } = AuthContext();
  const navigate = useNavigate('');

  const handleMypage = () => {
    const { nickname } = currentUser();
    navigate(`/user/${nickname}`, { replace: true });
  };

  const handleLogout = () => {
    signOut();
    navigate('/', { replace: true });
    alert('로그아웃 완료');
  };

  useEffect(() => {}, []);
  return (
    <HeaderStyle>
      <Logo className="logo" to={'/'}>
        <span>Mashillaeng</span>
      </Logo>
      <Nav>
        <button>
          <SearchIcon />
        </button>
        <Board to={'/'}>Board</Board>
        <Mypage onClick={handleMypage}>MyPage</Mypage>
        <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
        <Login to={'/signin'}>Login</Login>
      </Nav>
    </HeaderStyle>
  );
}
