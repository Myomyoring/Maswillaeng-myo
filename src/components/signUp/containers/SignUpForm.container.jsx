import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { emailRule, nicknameRule, passwordRule, phoneNumberRule } from '../../../utils/sign_up_rules.js';
import { userService } from '../../../services/user.service.jsx';
import SignUpFormPresenter from '../presenters/SignUpForm.presenter.jsx';

import DefaultUserImage from '../../../statics/images/default_user_image.jpg';

export default function SignUpFormContainer() {
  const navigate = useNavigate();
  const [userImg, setUserImg] = useState(DefaultUserImage);
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
          userImage: userImg,
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
    <SignUpFormPresenter
      {...{
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
      }}
    />
  );
}
