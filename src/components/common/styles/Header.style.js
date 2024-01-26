import { Link } from 'react-router-dom';

import styled from 'styled-components';
import tw from 'twin.macro';

export const HeaderStyle = styled.header`
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
export const Nav = styled.nav`
  ${tw``}
`;
export const Ul = styled.ul`
  ${tw`
    flex items-center
  `}
`;
export const Li = styled.li`
  ${tw`
    cursor-pointer
  `}
`;
export const LoginLink = styled(Link)`
  ${tw``}
`;
export const MyPageLink = styled(Link)`
  ${tw``}
`;
export const LogOutButton = styled.button`
  ${tw``}
`;
