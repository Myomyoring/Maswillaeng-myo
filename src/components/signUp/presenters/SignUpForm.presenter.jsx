import DuplicateCheckButton from '../../common/EventButton';
import SubmitButton from '../../common/FormButton.jsx';
import ImageInput from '../../common/ImageInput.jsx';

import styled from 'styled-components';
import tw from 'twin.macro';
import PwdCheckIcon from '../../../statics/svg/password_check_icon.jsx';
import PwdLockIcon from '../../../statics/svg/password_lock_icon.jsx';
import {
  SIGN_UP_INTRODUCTION_GUIDE,
  SIGN_UP_NICKNAME_GUIDE,
  SIGN_UP_PASSWORD_GUIDE,
  SIGN_UP_PHONE_NUMBER_GUIDE,
} from '../../../constants/index';

const SignUpFormStyle = styled.div`
  ${tw``}
`;

const Form = styled.form`
  ${tw``}
`;

const InputName = styled.div`
  ${tw`
      pt-2
      text-sm
  `}
`;

const InputBox = styled.div`
  ${tw`
      relative
      text-left
  `}

  input[name="email"], input[name="nickname"] {
    ${tw`
         max-w-[318px] mr-7
    `}
  }

  svg {
    ${tw`
        absolute right-2 top-10
    `}
  }
`;

const SignUpGuideText = styled.span`
  ${tw`
      text-xs text-darkgray px-2
  `}
`;

const Input = styled.input`
  ${tw`
      w-full h-10
      my-2 p-2
      bg-white
      border-none
      outline
      outline-gray
  `}

  &:focus {
    ${tw`outline-point`}
  }
  &:last-child {
    ${tw`mb-10`}
  }

  ${(props) => (props.type === 'file' ? tw`hidden` : tw``)}
`;

const ErrorBox = styled.div`
  ${tw`
      pb-1
      text-xs text-point
  `}
  ${(props) => (props.onBlur ? tw`hidden` : tw``)}
`;
export default function SignUpFormPresenter({
  form,
  errMessage,
  handleChange,
  onSubmitHandler,
  setUserImg,
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
  DefaultUserImage,
}) {
  return (
    <SignUpFormStyle>
      <Form onSubmit={onSubmitHandler}>
        <ImageInput defaultImg={DefaultUserImage} setImage={setUserImg} />
        <InputBox>
          <InputName>* 이메일</InputName>
          <Input
            type="text"
            name="email"
            value={form.email}
            onChange={handleChange}
            onBlur={emailCheck}
            placeholder="이메일 입력"
          />
          <DuplicateCheckButton onClick={(event) => duplicateEmail(event)}>중복확인</DuplicateCheckButton>
          <ErrorBox>{errMessage.emailErr}</ErrorBox>
        </InputBox>
        <InputBox>
          <InputName>
            * 비밀번호
            <SignUpGuideText>{SIGN_UP_PASSWORD_GUIDE}</SignUpGuideText>
          </InputName>
          <Input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            onBlur={passwordCheck}
            placeholder="비밀번호 입력"
          />
          {passwordConfirm ? <PwdCheckIcon /> : <PwdLockIcon />}
        </InputBox>
        <InputBox>
          <InputName>* 비밀번호 재확인</InputName>
          <Input
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            onBlur={passwordCheck}
            placeholder="비밀번호 재입력"
          />
          <ErrorBox>{errMessage.pwdErr}</ErrorBox>
          {passwordConfirm ? <PwdCheckIcon /> : <PwdLockIcon />}
        </InputBox>
        <InputBox>
          <InputName>
            * 닉네임
            <SignUpGuideText>{SIGN_UP_NICKNAME_GUIDE}</SignUpGuideText>
          </InputName>
          <Input
            type="text"
            name="nickname"
            value={form.nickname}
            onChange={handleChange}
            onBlur={nicknameCheck}
            placeholder="닉네임 입력"
          />
          <DuplicateCheckButton onClick={(event) => duplicateNickname(event)}>중복확인</DuplicateCheckButton>
          <ErrorBox>{errMessage.nickErr}</ErrorBox>
        </InputBox>
        <InputBox>
          <InputName>
            * 휴대전화
            <SignUpGuideText>{SIGN_UP_PHONE_NUMBER_GUIDE}</SignUpGuideText>
          </InputName>
          <Input
            type="text"
            name="phoneNumber"
            value={form.phoneNumber}
            onChange={handleChange}
            onBlur={phoneNumberCheck}
            placeholder="전화번호 입력"
          />
          <ErrorBox>{errMessage.phoneErr}</ErrorBox>
        </InputBox>
        <InputBox>
          <InputName>
            자기소개
            <SignUpGuideText>{SIGN_UP_INTRODUCTION_GUIDE}</SignUpGuideText>
          </InputName>
          <Input
            type="text"
            name="introduction"
            value={form.introduction}
            onChange={handleChange}
            placeholder="소개글을 작성해주세요"
            maxLength="30"
          />
        </InputBox>
        <SubmitButton width="full" disabled={!emailConfirm || !passwordConfirm || !nicknameConfirm || !phoneConfirm}>
          가입하기
        </SubmitButton>
      </Form>
    </SignUpFormStyle>
  );
}
