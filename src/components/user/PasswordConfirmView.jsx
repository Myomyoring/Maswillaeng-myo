import Button from '../common/EventButton';
import * as S from './styles/index';

export default function PasswordConfirmView({ passwordConfirm, userPasswordConfirm, onChange }) {
  return (
    <S.PasswordConfirmViewStyle>
      <S.InputBox>
        <S.Input
          type="password"
          name="password"
          value={passwordConfirm}
          onChange={onChange}
          placeholder="비밀번호 확인"
        />
      </S.InputBox>
      <Button onClick={userPasswordConfirm}>확인</Button>
    </S.PasswordConfirmViewStyle>
  );
}
