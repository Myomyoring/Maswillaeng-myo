import * as S from '../styles/LogInForm.style';

export default function LogInFormPresenter({ email, password, onChange, error, onSubmit, isLoading }) {
  return (
    <S.LoginFormStyle>
      <S.Form onSubmit={onSubmit}>
        <S.Input type="text" name="email" value={email} onChange={onChange} placeholder="아이디" />
        <S.Input type="password" name="password" value={password} onChange={onChange} placeholder="비밀번호" />
        <S.ErrorBox>{error}</S.ErrorBox>
        <S.LogInButton disabled={!email || !password || isLoading}>{isLoading ? '로딩 중' : '로그인'}</S.LogInButton>
        <S.SignUpLink to={`/signUp`}>회원가입</S.SignUpLink>
      </S.Form>
    </S.LoginFormStyle>
  );
}
