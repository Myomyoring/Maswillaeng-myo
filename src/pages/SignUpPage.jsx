import React, { useState } from 'react';
import axios from 'axios';
import { styled } from 'styled-components';
import tw from 'twin.macro';

import ImageInput from '../components/signUp/ImageInput';
import DefaultUserImage from '../statics/images/default_user_image.jpg';
import PwdCheckIcon from '../statics/svg/pwdCheckIcon';
import PwdLockIcon from '../statics/svg/pwdLockIcon';
import { emailRule, nicknameRule, passwordRule, phoneNumberRule } from '../utils/signUpRules';
import { useNavigate } from 'react-router-dom';

const SignUpContainer = styled.div`
  ${tw`
      w-96
      mx-auto pb-20
      text-center
    `}
`;

const Logo = styled.h1`
  ${tw`
      my-7
      font-extrabold text-point text-4xl

  `}
`;

const Form = styled.form``;

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

const Span = styled.span`
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

  ${(props) => (props.type === 'file' ? tw`hidden` : tw``)}
`;

const Error = styled.div`
  ${tw`
      pb-1
      text-xs text-point
  `}
  ${(props) => (props.onBlur ? tw`hidden` : tw``)}
`;

const DuplicateButton = styled.span`
  ${tw`
        w-24 h-20 
        p-3
      bg-point
        font-bold text-white text-sm
        cursor-pointer
    `}
`;

const SignUpButton = styled.button`
  ${tw`
      w-full h-12 
      my-2
      font-bold text-white
    `}
  ${(props) => (props.disabled ? tw`bg-gray cursor-not-allowed` : tw`bg-point`)}
`;

export default function SignUpPage() {
  const navigate = useNavigate();
  const [profileImg, setProfileImg] = useState(DefaultUserImage);
  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    nickname: '',
    phoneNumber: '',
    userImage: profileImg,
    introduction: '',
  });
  const { email, password, confirmPassword, nickname, phoneNumber, userImage, introduction } = form;
  const [errMessage, setErrMessage] = useState({
    emailErr: '',
    pwdErr: '',
    nickErr: '',
    phoneErr: '',
  });
  const [duplicateCheck, setDuplicateCheck] = useState(false);
  const [emailConfirm, setEmailConfirm] = useState(false);
  const [passwordConfirm, setPasswordConfirm] = useState(false);
  const [nicknameConfirm, setNicknameConfirm] = useState(false);
  const [phoneConfirm, setPhoneConfirm] = useState(false);

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setForm({ ...form, [name]: value });
  };

  const ruleCheck = (checkValue) => {
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

    const duplicateEmail = async () => {
      if (!emailRule(email)) {
        return;
      } else {
        try {
          const res = await axios.post('/api/auth/duplicate/email', { email });
          console.log(res);
          if (res.status === 200) {
            setErrMessage({ emailErr: '사용 가능' });
            setEmailConfirm(true);
            setDuplicateCheck(false);
          }
        } catch (err) {
          if (err.response.status === 409) {
            setErrMessage({ emailErr: '이미 존재하는 이메일' });
            setEmailConfirm(false);
            setDuplicateCheck(false);
          }
        }
      }
    };

    const duplicateNickname = async () => {
      if (!nicknameRule(nickname)) {
        return;
      } else {
        try {
          const res = await axios.post('/api/auth/duplicate/nickname', { nickname });
          console.log(res);
          if (res.status === 200) {
            setErrMessage({ nickErr: '사용 가능' });
            setNicknameConfirm(true);
            setDuplicateCheck(false);
          }
        } catch (err) {
          if (err.response.status === 409) {
            setErrMessage({ nickErr: '이미 존재하는 닉네임' });
            setNicknameConfirm(false);
            setDuplicateCheck(false);
          }
        }
      }
    };

    switch (checkValue) {
      case 'Email':
        emailCheck();
        break;
      case 'Nickname':
        nicknameCheck();
        break;
      case 'PhoneNumber':
        phoneNumberCheck();
        break;
      case 'Password':
        passwordCheck();
        break;
      case 'EmailBtn':
        duplicateEmail();
        setDuplicateCheck(true);
        break;
      case 'NicknameBtn':
        duplicateNickname();
        setDuplicateCheck(true);
        break;
      default:
        return false;
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    console.log(form);

    if (emailConfirm && passwordConfirm && nicknameConfirm && phoneConfirm) {
      try {
        const res = await axios.post('/api/auth/sign', {
          userImage,
          email,
          password,
          nickname,
          phoneNumber,
          introduction,
        });
        console.log(res);
        navigate('/signin', { replace: true });
        alert('회원가입 성공');
        return;
      } catch (err) {
        console.log(err);
      }
    } else return;
  };

  return (
    <SignUpContainer>
      <Logo>MASHILLAENG</Logo>
      <Form onSubmit={onSubmitHandler}>
        <ImageInput defaultImg={DefaultUserImage} image={setProfileImg} />
        <InputBox>
          <InputName>
            자기소개
            <Span>* 최대 30자까지 입력</Span>
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
        <InputBox>
          <InputName>이메일</InputName>
          <Input
            type="text"
            name="email"
            value={email}
            onChange={handleChange}
            onBlur={() => ruleCheck('Email')}
            placeholder="이메일 입력"
          />
          <DuplicateButton onClick={() => ruleCheck('EmailBtn')}>중복확인</DuplicateButton>
          <Error>{errMessage.emailErr}</Error>
        </InputBox>
        <InputBox>
          <InputName>
            비밀번호
            <Span>* 영문, 숫자 포함 8~16자 입력</Span>
          </InputName>
          <Input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            onBlur={() => ruleCheck('Password')}
            placeholder="비밀번호 입력"
          />
          {passwordConfirm ? <PwdCheckIcon /> : <PwdLockIcon />}
        </InputBox>
        <InputBox>
          <InputName>비밀번호 재확인</InputName>
          <Input
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleChange}
            onBlur={() => ruleCheck('Password')}
            placeholder="비밀번호 재입력"
          />
          <Error>{errMessage.pwdErr}</Error>
          {passwordConfirm ? <PwdCheckIcon /> : <PwdLockIcon />}
        </InputBox>
        <InputBox>
          <InputName>
            닉네임
            <Span>* 한글, 영문 2~10자 입력</Span>
          </InputName>
          <Input
            type="text"
            name="nickname"
            value={nickname}
            onChange={handleChange}
            onBlur={() => ruleCheck('Nickname')}
            placeholder="닉네임 입력"
          />
          <DuplicateButton onClick={() => ruleCheck('NicknameBtn')}>중복확인</DuplicateButton>
          <Error>{errMessage.nickErr}</Error>
        </InputBox>
        <InputBox>
          <InputName>
            휴대전화
            <Span>ex) 01012345678</Span>
          </InputName>
          <Input
            type="text"
            name="phoneNumber"
            value={phoneNumber}
            onChange={handleChange}
            onBlur={() => ruleCheck('PhoneNumber')}
            placeholder="전화번호 입력"
          />
          <Error>{errMessage.phoneErr}</Error>
        </InputBox>
        <SignUpButton
          disabled={!emailConfirm || !passwordConfirm || !nicknameConfirm || !phoneConfirm}
        >
          가입하기
        </SignUpButton>
      </Form>
    </SignUpContainer>
  );
}
