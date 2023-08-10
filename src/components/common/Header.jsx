import React from 'react';
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';
import tw from 'twin.macro';
import SearchIcon from '../../statics/svg/searchIcon';

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

export default function Header() {
  return (
    <HeaderStyle>
      <Link className="logo" to={'/'}>
        <span>Mashillaeng</span>
      </Link>
      <div>
        <button>
          <SearchIcon />
        </button>
        <Link to={'/'}>
          <span>Board</span>
        </Link>

        <Link to={'/'}>
          <span>MyPage</span>
        </Link>
        <button>Logout</button>

        <Link to={'/signin'}>
          <span>Login</span>
        </Link>
      </div>
    </HeaderStyle>
  );
}
