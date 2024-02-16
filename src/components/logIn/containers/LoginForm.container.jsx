import { useState } from 'react';

import { CONFIRM_MESSAGE, LOGIN_MESSAGE } from '../../../constants';
import { useAuth } from '../../../contexts/ProvideAuthContext';
import { useRouter } from '../../../hooks/useRouter';
import LoginFormPresenter from '../presenters/LogInForm.presenter';

export default function LogInFormContainer() {
  const { logIn } = useAuth();
  const { authRouteTo } = useRouter();
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [user, setUser] = useState({ email: '', password: '' });
  const { email, password } = user;

  const onChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (email === '' || password === '') {
      setError(LOGIN_MESSAGE.EMPTY);
      return;
    }
    try {
      setLoading(true);
      const response = await logIn(email, password);
      if (response === 'success') {
        authRouteTo('/');
        alert(LOGIN_MESSAGE.SUCCESS);
      }
    } catch (error) {
      switch (error.code) {
        case 'auth/invalid-login-credentials':
          setError(LOGIN_MESSAGE.DISCORDANCE);
          break;
        case 'auth/invalid-email':
          setError(CONFIRM_MESSAGE.EMAIL_RULE_ERROR);
          break;
        default:
          setError('');
      }
    } finally {
      setLoading(false);
    }
  };

  return <LoginFormPresenter {...{ email, password, onChange, error, onSubmit, isLoading }} />;
}
