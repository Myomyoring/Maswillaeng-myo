import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import tw from 'twin.macro';
import { AuthContext } from '../auth/ProvideAuthContext';

const Container = styled.div`
  ${tw`
        w-full h-screen
        flex justify-center items-center
        text-center
        bg-cover
        bg-[url('https://cdn.pixabay.com/photo/2018/03/18/18/54/drink-3237895_1280.jpg')]
    `}
`;

const Contents = styled.div`
  ${tw`
        px-44 py-20
        items-center
        rounded-xl 
        bg-main bg-opacity-70
    `}

  * {
    ${tw`
        bg-transparent
    `}
  }

  form > a {
    ${tw`
        text-xs
         px-3
    `}
  }
`;

const Form = styled.form`
  ${tw`
        
    `}
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
`;

const ErrorBox = styled.div`
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

export default function SignInPage() {
  const { signIn } = AuthContext();

  const navigate = useNavigate('');
  const [errMessage, setErrMessage] = useState('');
  const [user, setUser] = useState({ email: '', password: '' });
  const { email, password } = user;

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setUser({ ...user, [name]: value });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (email === '' || password === '') {
      setErrMessage('아이디 혹은 비밀번호를 입력해주세요');
      return;
    }
    try {
      const response = await signIn(email, password);
      response && navigate('/', { replace: true });
      alert('로그인 성공');
    } catch (err) {
      setErrMessage('로그인 실패');
    }
  };

  return (
    <Container>
      <Contents>
        <Link to={'/'} className="logo">
          Mashillaeng
        </Link>
        <Form onSubmit={onSubmitHandler}>
          <Input
            type="text"
            name="email"
            value={email}
            onChange={handleChange}
            placeholder="아이디"
          />
          <Input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            placeholder="비밀번호"
          />
          <ErrorBox>{errMessage}</ErrorBox>
          <Button disabled={!email || !password}>로그인</Button>
          <Link to={'/signup'}>회원가입</Link>
          <Link to={'/'}>아이디 / 비밀번호 찾기</Link>
        </Form>
      </Contents>
    </Container>
  );
}
