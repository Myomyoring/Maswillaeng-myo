import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { emailRule, nicknameRule, passwordRule, phoneNumberRule } from '../../utils/sign_up_rules.js';
import { userService } from '../../services/user.service.jsx';
import DuplicateButton from '../common/EventButton.jsx';
import FormButton from '../common/FormButton.jsx';
import ImageInput from '../../hoc/ImageInput.jsx';

import styled from 'styled-components';
import tw from 'twin.macro';
import DefaultUserImage from '../../statics/images/default_user_image.jpg';
import PwdCheckIcon from '../../statics/svg/password_check_icon.jsx';
import PwdLockIcon from '../../statics/svg/password_lock_icon.jsx';

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
      text-left relative
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

export default function SignUpForm() {
  const navigate = useNavigate();
  const [profileImg, setProfileImg] = useState(DefaultUserImage);
  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    nickname: '',
    phoneNumber: '',
    introduction: '',
  });
  const { email, password, confirmPassword, nickname, phoneNumber, introduction } = form;
  const [errMessage, setErrMessage] = useState({
    emailErr: '',
    pwdErr: '',
    nickErr: '',
    phoneErr: '',
  });
  const handleChange = ({ target }) => {
    const { name, value } = target;
    setForm({ ...form, [name]: value });
  };

  const [emailConfirm, setEmailConfirm] = useState(false);
  const [passwordConfirm, setPasswordConfirm] = useState(false);
  const [nicknameConfirm, setNicknameConfirm] = useState(false);
  const [phoneConfirm, setPhoneConfirm] = useState(false);

  const emailCheck = () => {
    if (!emailRule(email)) {
      setErrMessage({ emailErr: '올바른 형식으로 작성해주세요.' });
      setEmailConfirm(false);
    } else {
      setErrMessage({ emailErr: '' });
    }
  };

  const passwordCheck = () => {
    if (!passwordRule(password)) {
      setErrMessage({ pwdErr: '영문과 숫자를 포함하여 8~15자를 작성해주세요' });
      setPasswordConfirm(false);
    } else if (password !== confirmPassword) {
      setErrMessage({ pwdErr: '비밀번호가 일치하지 않습니다.' });
      setPasswordConfirm(false);
    } else {
      setErrMessage({ pwdErr: '' });
      setPasswordConfirm(true);
    }
  };

  const nicknameCheck = () => {
    if (!nicknameRule(nickname)) {
      setErrMessage({
        nickErr: '2~10자리의 한글이나 영문으로 이루어진 닉네임을 작성해주세요.',
      });
      setNicknameConfirm(false);
    } else {
      setErrMessage({ nickErr: '' });
    }
  };

  const phoneNumberCheck = () => {
    if (!phoneNumberRule(phoneNumber)) {
      setErrMessage({
        phoneErr: "'-' 를 제외한 10~11자의 올바른 핸드폰 번호를 작성해주세요.",
      });
      setPhoneConfirm(false);
    } else {
      setErrMessage({
        phoneErr: '',
      }),
        setPhoneConfirm(true);
    }
  };

  const duplicateEmail = async (event) => {
    event.preventDefault();
    if (!emailRule(email)) {
      return;
    } else {
      try {
        const response = await userService.duplicateEmail({ email });
        console.log(response);
        if (response.statusText === 'OK') {
          setErrMessage({ emailErr: '사용 가능' });
          setEmailConfirm(true);
        }
      } catch (error) {
        if (error.response.status === 409) {
          setErrMessage({ emailErr: '이미 존재하는 이메일' });
          setEmailConfirm(false);
        } else {
          console.log(error);
          return;
        }
      }
    }
  };

  const duplicateNickname = async (event) => {
    event.preventDefault();
    if (!nicknameRule(nickname)) {
      return;
    } else {
      try {
        const response = await userService.duplicateNickName({ nickname });
        if (response.statusText === 'OK') {
          setErrMessage({ nickErr: '사용 가능' });
          setNicknameConfirm(true);
        }
      } catch (error) {
        if (error.response.status === 409) {
          setErrMessage({ nickErr: '이미 존재하는 닉네임' });
          setNicknameConfirm(false);
        } else {
          console.log(error);
          return;
        }
      }
    }
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (emailConfirm && passwordConfirm && nicknameConfirm && phoneConfirm) {
      try {
        const response = await userService.signUp({
          userImage: profileImg,
          email,
          password,
          nickname,
          phoneNumber,
          introduction,
        });
        if (response.statusText === 'OK') {
          navigate(`/logIn`, { replace: true });
          alert('회원가입 성공');
        } else {
          alert('회원가입 에러');
          return;
        }
      } catch (error) {
        if (error.response.status === 409) {
          alert('작성하신 내용을 다시 확인해주세요');
          return;
        } else {
          console.log(error);
          return;
        }
      }
    } else return;
  };

  return (
    <Form onSubmit={onSubmitHandler}>
      <ImageInput defaultImg={DefaultUserImage} image={setProfileImg} />
      <InputBox>
        <InputName>* 이메일</InputName>
        <Input
          type="text"
          name="email"
          value={email}
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
          <Guide>* 영문, 숫자 포함 8~16자 입력</Guide>
        </InputName>
        <Input
          type="password"
          name="password"
          value={password}
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
          value={confirmPassword}
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
          <Guide>* 한글, 영문 2~10자 입력</Guide>
        </InputName>
        <Input
          type="text"
          name="nickname"
          value={nickname}
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
          <Guide>ex) 01012345678</Guide>
        </InputName>
        <Input
          type="text"
          name="phoneNumber"
          value={phoneNumber}
          onChange={handleChange}
          onBlur={phoneNumberCheck}
          placeholder="전화번호 입력"
        />
        <Error>{errMessage.phoneErr}</Error>
      </InputBox>
      <InputBox>
        <InputName>
          자기소개
          <Guide>* 최대 30자까지 입력</Guide>
        </InputName>
        <Input
          type="text"
          name="introduction"
          value={introduction}
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
