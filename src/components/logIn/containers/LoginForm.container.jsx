import { useState } from 'react';

import LoginFormPresenter from '../presenters/LoginForm.presenter';
import { Navi } from '../../common/Navi';
import { useAuth } from '../../../context/ProvideAuthContext';
import { EMAIL_RULE_ERROR_GUIDE, LOGIN_EMPTY_GUIDE, LOGIN_ERROR_GUIDE } from '../../../constants';

export default function LoginFormContainer() {
  const { authNavi } = Navi();
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
      setErrMessage(LOGIN_EMPTY_GUIDE);
      return;
    }
    try {
      const response = await logIn(email, password);
      if (response === 'success') {
        authNavi('/');
        alert('로그인 성공');
      }
    } catch (error) {
      console.log(error.code);
      switch (error.code) {
        case 'auth/invalid-login-credentials':
          setErrMessage(LOGIN_ERROR_GUIDE);
          break;
        case 'auth/invalid-email':
          setErrMessage(EMAIL_RULE_ERROR_GUIDE);
          break;
        default:
          setErrMessage('');
      }
      return;
    }
  };

  return <LoginFormPresenter {...{ email, password, handleChange, errMessage, onSubmitHandler }} />;
}
