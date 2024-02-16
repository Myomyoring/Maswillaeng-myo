import { Link } from 'react-router-dom';

import styled from 'styled-components';
import tw from 'twin.macro';

export const LoginFormStyle = styled.div`
  ${tw``}
`;

export const Form = styled.form`
  ${tw``}
`;

export const Input = styled.input`
  ${tw`
        px-4 py-4
        bg-white
        text-lg
        rounded-md
        border-none
        outline-none

        desktop:w-3/4
        tablet:w-3/4
        mobile:w-5/6 my-2
    `}
  &:focus {
    ${tw`
      outline-point
    `}
  }
`;

export const ErrorBox = styled.div`
  ${tw`
        my-2
        text-md
        font-bold text-point
    `}
`;

export const LogInButton = styled.button`
  ${tw`
        my-2 py-4
        bg-point
        text-xl text-white
        rounded-md

        desktop:w-3/4
        tablet:w-3/4
        mobile:w-5/6
    `}
  ${(props) => (props.disabled ? tw`bg-gray cursor-not-allowed` : tw`bg-point`)}
`;

export const SignUpLink = styled(Link)`
  ${tw`
        block
        text-md text-white
        my-6
  `}
`;
