import { useState } from 'react';
import { Link } from 'react-router-dom';

import { useAuth } from '../../context/ProvideAuthContext';

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
        my-2 px-24 py-2
        flex
        bg-point
        text-lg text-white
        rounded-3xl
    `}

  ${(props) => (props.disabled ? tw`bg-gray cursor-not-allowed` : tw`bg-point`)}
`;

export default function LoginForm() {
  const { signIn } = useAuth();

  const [user, setUser] = useState({ email: '', password: '' });
  const { email, password } = user;
  const [errMessage, setErrMessage] = useState('');

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setUser({ ...user, [name]: value });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (email === '' || password === '') {
      setErrMessage('아이디 또는 비밀번호를 입력해주세요');
      return;
    }
    try {
      const response = await signIn(email, password);
      if (!response) {
        setErrMessage('아이디 또는 비밀번호를 확인해주세요');
        return;
      } else {
        response && window.location.replace('/');
        alert('로그인 성공');
      }
    } catch (err) {
      setErrMessage('로그인 실패');
      return;
    }
  };

  return (
    <Form onSubmit={onSubmitHandler}>
      <Input type="text" name="email" value={email} onChange={handleChange} placeholder="아이디" />
      <Input type="password" name="password" value={password} onChange={handleChange} placeholder="비밀번호" />
      <ErrorMessage>{errMessage}</ErrorMessage>
      <Button disabled={!email || !password}>로그인</Button>
      <Link to={`/signUp`}>회원가입</Link>
      <Link to={`/`}>아이디 / 비밀번호 찾기</Link>
    </Form>
  );
}
