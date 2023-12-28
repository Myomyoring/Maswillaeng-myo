import { Link } from 'react-router-dom';

import styled from 'styled-components';
import tw from 'twin.macro';

const LoginFormStyle = styled.div`
  ${tw``}
`;

const Form = styled.form`
  ${tw``}
`;

const Input = styled.input`
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

const ErrorBox = styled.div`
  ${tw`
        my-2
        text-md
        font-bold text-point
    `}
`;

const LoginButton = styled.button`
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

const SignUpLink = styled(Link)`
  ${tw`
        block
        text-md text-white
        my-6
  `}
`;
export default function LoginFormPresenter({ email, password, handleChange, errMessage, onSubmitHandler }) {
  return (
    <LoginFormStyle>
      <Form onSubmit={onSubmitHandler}>
        <Input type="text" name="email" value={email} onChange={handleChange} placeholder="아이디" />
        <Input type="password" name="password" value={password} onChange={handleChange} placeholder="비밀번호" />
        <ErrorBox>{errMessage}</ErrorBox>
        <LoginButton disabled={!email || !password}>로그인</LoginButton>
        <SignUpLink to={`/signUp`}>회원가입</SignUpLink>
        {/* <Link to={`/`}>아이디 / 비밀번호 찾기</Link> */}
      </Form>
    </LoginFormStyle>
  );
}
