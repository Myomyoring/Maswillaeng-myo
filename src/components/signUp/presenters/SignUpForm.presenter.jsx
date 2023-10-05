import DuplicateButton from '../../common/EventButton';
import FormButton from '../../common/FormButton.jsx';
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
       w-4/6 mr-7
    `}
  }

  svg {
    ${tw`
        absolute right-2 top-10
    `}
  }
`;

const Guide = styled.span`
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

  ${(props) => (props.type === 'file' ? tw`hidden` : tw``)}
`;

const Error = styled.div`
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
        <DuplicateButton onClick={(event) => duplicateEmail(event)}>중복확인</DuplicateButton>
        <Error>{errMessage.emailErr}</Error>
      </InputBox>
      <InputBox>
        <InputName>
          * 비밀번호
          <Guide>{SIGN_UP_PASSWORD_GUIDE}</Guide>
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
        <Error>{errMessage.pwdErr}</Error>
        {passwordConfirm ? <PwdCheckIcon /> : <PwdLockIcon />}
      </InputBox>
      <InputBox>
        <InputName>
          * 닉네임
          <Guide>{SIGN_UP_NICKNAME_GUIDE}</Guide>
        </InputName>
        <Input
          type="text"
          name="nickname"
          value={form.nickname}
          onChange={handleChange}
          onBlur={nicknameCheck}
          placeholder="닉네임 입력"
        />
        <DuplicateButton onClick={(event) => duplicateNickname(event)}>중복확인</DuplicateButton>
        <Error>{errMessage.nickErr}</Error>
      </InputBox>
      <InputBox>
        <InputName>
          * 휴대전화
          <Guide>{SIGN_UP_PHONE_NUMBER_GUIDE}</Guide>
        </InputName>
        <Input
          type="text"
          name="phoneNumber"
          value={form.phoneNumber}
          onChange={handleChange}
          onBlur={phoneNumberCheck}
          placeholder="전화번호 입력"
        />
        <Error>{errMessage.phoneErr}</Error>
      </InputBox>
      <InputBox>
        <InputName>
          자기소개
          <Guide>{SIGN_UP_INTRODUCTION_GUIDE}</Guide>
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
      <FormButton disabled={!emailConfirm || !passwordConfirm || !nicknameConfirm || !phoneConfirm}>
        가입하기
      </FormButton>
    </Form>
  );
}
