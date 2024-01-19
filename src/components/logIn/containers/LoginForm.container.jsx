import { useState } from 'react';

import LoginFormPresenter from '../presenters/LoginForm.presenter';
import { useAuth } from '../../../contexts/ProvideAuthContext';
import { CONFIRM_MESSAGE, LOGIN_MESSAGE } from '../../../constants';
import { useRouter } from '../../../hooks/useRouter';

export default function LoginFormContainer() {
  const { authRouteTo } = useRouter();
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
      setErrMessage(LOGIN_MESSAGE.EMPTY);
      return;
    }
    try {
      const response = await logIn(email, password);
      if (response === 'success') {
        authRouteTo('/');
        alert(LOGIN_MESSAGE.SUCCESS);
      }
    } catch (error) {
      switch (error.code) {
        case 'auth/invalid-login-credentials':
          setErrMessage(LOGIN_MESSAGE.DISCORDANCE);
          break;
        case 'auth/invalid-email':
          setErrMessage(CONFIRM_MESSAGE.EMAIL_RULE_ERROR);
          break;
        default:
          setErrMessage('');
      }
      return;
    }
  };

  return <LoginFormPresenter {...{ email, password, handleChange, errMessage, onSubmitHandler }} />;
}
