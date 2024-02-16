import DuplicateButton from '../../common/EventButton';
import ProfileImageInput from '../../common/ProfileImageInput';
import SubmitButton from '../../common/FormButton';

import { SIGN_UP_GUIDE } from '../../../constants';

import * as S from '../styles/EditProfileForm.style';

export default function EditProfileFormPresenter({
  user,
  isLoading,
  onSubmit,
  form,
  profileImage,
  setProfileImage,
  onChange,
  nicknameCheck,
  error,
  passwordCheck,
  newPasswordCheck,
  phoneNumberCheck,
  newPwds,
}) {
  return (
    <S.EditProfileFormStyle>
      <S.Form onSubmit={onSubmit}>
        <S.EditProfileImage>
          <ProfileImageInput currentImage={profileImage} setImage={setProfileImage} userId={user.userId} />
        </S.EditProfileImage>
        <S.UserInfoBox>
          <S.InputBox>
            <S.InputTitle>
              * 닉네임
              <S.GuideText>{SIGN_UP_GUIDE.NICKNAME}</S.GuideText>
            </S.InputTitle>
            <S.Div>
              <S.Input
                type="text"
                name="nickname"
                value={form.nickname}
                onChange={onChange}
                placeholder="닉네임 입력"
              />
              <DuplicateButton name="nickname" onClick={nicknameCheck} disabled={isLoading}>
                {isLoading ? '로딩 중' : '중복확인'}
              </DuplicateButton>
            </S.Div>
            <S.ErrorBox>{error.nickname}</S.ErrorBox>
          </S.InputBox>
          <S.InputBox>
            <S.InputTitle>* 현재 비밀번호</S.InputTitle>
            <S.Input
              type="password"
              name="password"
              value={form.password}
              onChange={onChange}
              onBlur={passwordCheck}
              placeholder="비밀번호 입력"
            />
            <S.ErrorBox>{error.password}</S.ErrorBox>
          </S.InputBox>
          <S.InputBox>
            <S.InputTitle>
              새 비밀번호
              <S.GuideText>{SIGN_UP_GUIDE.PASSWORD}</S.GuideText>
            </S.InputTitle>
            <S.Input
              type="password"
              name="newPwd"
              value={newPwds.newPwd}
              onChange={onChange}
              onBlur={newPasswordCheck}
              placeholder="새 비밀번호 입력"
            />
          </S.InputBox>
          <S.InputBox>
            <S.InputTitle>새 비밀번호 확인</S.InputTitle>
            <S.Input
              type="password"
              name="newConfirmPwd"
              value={newPwds.newConfirmPwd}
              onChange={onChange}
              onBlur={newPasswordCheck}
              placeholder="새 비밀번호 확인"
            />
            <S.ErrorBox>{error.newPwd}</S.ErrorBox>
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
        </S.UserInfoBox>
        <S.ButtonBox>
          <SubmitButton disabled={isLoading}>{isLoading ? '로딩 중' : '수정'}</SubmitButton>
        </S.ButtonBox>
      </S.Form>
    </S.EditProfileFormStyle>
  );
}
