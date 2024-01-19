import DuplicateCheckButton from '../../common/EventButton';
import SubmitButton from '../../common/FormButton.jsx';
import ProfileImageInput from '../../common/ProfileImageInput.jsx';

import { SIGN_UP_GUIDE } from '../../../constants/index.jsx';
import PwdCheckIcon from '../../../statics/svg/password_check_icon.jsx';
import PwdLockIcon from '../../../statics/svg/password_lock_icon.jsx';
import * as S from '../styles/SignUpForm.style.js';
import defaultUserImage from '../../../statics/images/default_user_image.jpg';

export default function SignUpFormPresenter({
  isLoading,
  form,
  error,
  onChange,
  onSubmit,
  setUserImage,
  emailCheck,
  passwordCheck,
  nicknameCheck,
  phoneNumberCheck,
  emailConfirm,
  passwordConfirm,
  nicknameConfirm,
  phoneConfirm,
  duplicateEmail,
  duplicateNickname,
}) {
  return (
    <S.SignUpFormStyle>
      <S.Form onSubmit={onSubmit}>
        <ProfileImageInput defaultImage={defaultUserImage} setImage={setUserImage} />
        <S.InputBox>
          <S.InputTitle>* 이메일</S.InputTitle>
          <S.Input
            type="text"
            name="email"
            value={form.email}
            onChange={onChange}
            onBlur={emailCheck}
            placeholder="이메일 입력"
          />
          <DuplicateCheckButton onClick={(event) => duplicateEmail(event)}>중복확인</DuplicateCheckButton>
          <S.ErrorBox>{error.email}</S.ErrorBox>
        </S.InputBox>
        <S.InputBox>
          <S.InputTitle>
            * 비밀번호
            <S.GuideText>{SIGN_UP_GUIDE.PASSWORD}</S.GuideText>
          </S.InputTitle>
          <S.Input
            type="password"
            name="password"
            value={form.password}
            onChange={onChange}
            onBlur={passwordCheck}
            placeholder="비밀번호 입력"
          />
          {passwordConfirm ? <PwdCheckIcon /> : <PwdLockIcon />}
        </S.InputBox>
        <S.InputBox>
          <S.InputTitle>* 비밀번호 재확인</S.InputTitle>
          <S.Input
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={onChange}
            onBlur={passwordCheck}
            placeholder="비밀번호 재입력"
          />
          <S.ErrorBox>{error.password}</S.ErrorBox>
          {passwordConfirm ? <PwdCheckIcon /> : <PwdLockIcon />}
        </S.InputBox>
        <S.InputBox>
          <S.InputTitle>
            * 닉네임
            <S.GuideText>{SIGN_UP_GUIDE.NICKNAME}</S.GuideText>
          </S.InputTitle>
          <S.Input
            type="text"
            name="nickname"
            value={form.nickname}
            onChange={onChange}
            onBlur={nicknameCheck}
            placeholder="닉네임 입력"
          />
          <DuplicateCheckButton onClick={(event) => duplicateNickname(event)}>중복확인</DuplicateCheckButton>
          <S.ErrorBox>{error.nickname}</S.ErrorBox>
        </S.InputBox>
        <S.InputBox>
          <S.InputTitle>
            * 휴대전화
            <S.GuideText>{SIGN_UP_GUIDE.PHONE_NUMBER}</S.GuideText>
          </S.InputTitle>
          <S.Input
            type="text"
            name="phoneNumber"
            value={form.phoneNumber}
            onChange={onChange}
            onBlur={phoneNumberCheck}
            placeholder="전화번호 입력"
          />
          <S.ErrorBox>{error.phoneNumber}</S.ErrorBox>
        </S.InputBox>
        <S.InputBox>
          <S.InputTitle>
            자기소개
            <S.GuideText>{SIGN_UP_GUIDE.INTRODUCTION}</S.GuideText>
          </S.InputTitle>
          <S.Input
            type="text"
            name="introduction"
            value={form.introduction}
            onChange={onChange}
            placeholder="소개글을 작성해주세요"
            maxLength="30"
          />
        </S.InputBox>
        <SubmitButton
          width="full"
          disabled={isLoading || !emailConfirm || !passwordConfirm || !nicknameConfirm || !phoneConfirm}
        >
          {isLoading ? '로딩 중' : '가입하기'}
        </SubmitButton>
      </S.Form>
    </S.SignUpFormStyle>
  );
}
