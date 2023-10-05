import { Link } from 'react-router-dom';

import styled from 'styled-components';
import tw from 'twin.macro';

const Form = styled.form`
  ${tw``}
  a {
    ${tw`
        text-xs
        px-3
    `}
  }
`;

const Input = styled.input`
  ${tw`
        w-full
        my-2 px-6 py-2
        block
        bg-white
        rounded-3xl
        border-none
        outline-none
    `}
  &:focus {
    ${tw`outline-point`}
  }
`;

const ErrorMessage = styled.div`
  ${tw`
        my-1
        text-sm 
        font-bold text-point
    `}
`;

const Button = styled.button`
  ${tw`
        w-full
        my-2 px-24 py-2
        flex
        bg-point
        text-lg text-white
        rounded-3xl
    `}

  ${(props) => (props.disabled ? tw`bg-gray cursor-not-allowed` : tw`bg-point`)}
`;
export default function LoginFormPresenter({ email, password, handleChange, errMessage, onSubmitHandler }) {
  return (
    <Form onSubmit={onSubmitHandler}>
      <Input type="text" name="email" value={email} onChange={handleChange} placeholder="아이디" />
      <Input type="password" name="password" value={password} onChange={handleChange} placeholder="비밀번호" />
      <ErrorMessage>{errMessage}</ErrorMessage>
      <Button disabled={!email || !password}>로그인</Button>
      <Link to={`/signUp`}>회원가입</Link>
      {/* <Link to={`/`}>아이디 / 비밀번호 찾기</Link> */}
    </Form>
  );
}
