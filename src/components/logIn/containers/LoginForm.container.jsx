import { useState } from 'react';

import { useAuth } from '../../../context/ProvideAuthContext';
import LoginFormPresenter from '../presenters/LoginForm.presenter';

export default function LoginFormContainer() {
  const { logIn } = useAuth();

  const [user, setUser] = useState({ email: '', password: '' });
  const { email, password } = user;
  const [errMessage, setErrMessage] = useState('');

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setUser({ ...user, [name]: value });
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (email === '' || password === '') {
      setErrMessage('아이디 또는 비밀번호를 입력해주세요');
      return;
    }
    try {
      const response = await logIn(email, password);
      if (!response) {
        setErrMessage('아이디 또는 비밀번호를 확인해주세요');
        return;
      } else {
        response && window.location.replace('/');
        alert('로그인 성공');
      }
    } catch (error) {
      setErrMessage('로그인 실패');
      return;
    }
  };

  return <LoginFormPresenter {...{ email, password, handleChange, errMessage, onSubmitHandler }} />;
}
