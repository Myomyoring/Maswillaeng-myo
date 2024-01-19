import Logo from '../components/common/Logo';
import SignUpForm from '../components/signUp/containers/SignUpForm.container';

import * as S from './styles/index';

export default function SignUpPage() {
  return (
    <S.SignUpPageStyle>
      <Logo size="big" />
      <SignUpForm />
    </S.SignUpPageStyle>
  );
}
