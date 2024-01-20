import LoginForm from '../components/logIn/containers/LoginForm.container';
import Logo from '../components/common/Logo';

import * as S from './styles/index';

export default function LogInPage() {
  return (
    <S.LogInPageStyle>
      <Logo color="white" size="big" />
      <S.LoginBox>
        <LoginForm />
      </S.LoginBox>
    </S.LogInPageStyle>
  );
}
