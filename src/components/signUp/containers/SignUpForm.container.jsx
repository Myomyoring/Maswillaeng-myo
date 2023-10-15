import { useState } from 'react';

import { emailRule, nicknameRule, passwordRule, phoneNumberRule } from '../../../utils/sign_up_rules.js';
import { Navi } from '../../common/Navi.jsx';
import SignUpFormPresenter from '../presenters/SignUpForm.presenter.jsx';

import {
  DUPLICATE_GUIDE,
  EMAIL_RULE_ERROR_GUIDE,
  NICKNAME_RULE_ERROR_GUIDE,
  PASSWORD_CONFIRM_ERROR_GUIDE,
  PASSWORD_EMPTY_GUIDE,
  PASSWORD_RULE_ERROR_GUIDE,
  PASS_GUIDE,
  PHONE_NUMBER_RULE_ERROR_GUIDE,
} from '../../../constants/index.jsx';
import { useAuth } from '../../../context/ProvideAuthContext.jsx';

import DefaultUserImage from '../../../statics/images/default_user_image.jpg';

export default function SignUpFormContainer() {
  const { authNavi } = Navi();
  const { firebaseDuplicateEmail, firebaseDuplicateNickname, signUp } = useAuth();
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
      setErrMessage({ emailErr: EMAIL_RULE_ERROR_GUIDE });
      setEmailConfirm(false);
    } else {
      setErrMessage({ emailErr: '' });
    }
  };

  const passwordCheck = () => {
    if (!passwordRule(password)) {
      setErrMessage({ pwdErr: PASSWORD_RULE_ERROR_GUIDE });
      setPasswordConfirm(false);
    } else if (password !== confirmPassword) {
      setErrMessage({ pwdErr: PASSWORD_CONFIRM_ERROR_GUIDE });
      setPasswordConfirm(false);
    } else {
      setErrMessage({ pwdErr: '' });
      setPasswordConfirm(true);
    }
  };

  const nicknameCheck = () => {
    if (!nicknameRule(nickname)) {
      setErrMessage({
        nickErr: NICKNAME_RULE_ERROR_GUIDE,
      });
      setNicknameConfirm(false);
    } else {
      setErrMessage({ nickErr: '' });
    }
  };

  const phoneNumberCheck = () => {
    if (!phoneNumberRule(phoneNumber)) {
      setErrMessage({
        phoneErr: PHONE_NUMBER_RULE_ERROR_GUIDE,
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
      setEmailConfirm(false);
      return;
    } else {
      try {
        const response = await firebaseDuplicateEmail(email);
        if (response.empty) {
          setErrMessage({ emailErr: PASS_GUIDE });
          setEmailConfirm(true);
        } else {
          setErrMessage({ emailErr: DUPLICATE_GUIDE });
          setEmailConfirm(false);
          return;
        }
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  const duplicateNickname = async (event) => {
    event.preventDefault();
    if (!nicknameRule(nickname)) {
      setNicknameConfirm(false);
      return;
    } else {
      try {
        const response = await firebaseDuplicateNickname(nickname);
        if (response.empty) {
          setErrMessage({ nickErr: PASS_GUIDE });
          setNicknameConfirm(true);
        } else {
          setErrMessage({ nickErr: DUPLICATE_GUIDE });
          setNicknameConfirm(false);
          return;
        }
      } catch (error) {
        console.log(error);
        return;
      }
    }
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (emailConfirm && passwordConfirm && nicknameConfirm && phoneConfirm) {
      try {
        const response = await signUp({ userImage: userImg, email, password, nickname, phoneNumber, introduction });
        if (response === 'success') {
          authNavi('/login');
          alert('회원가입 성공');
        }
      } catch (error) {
        console.log(error.code);
        switch (error.code) {
          case 'auth/email-already-in-use':
            setErrMessage({ emailErr: DUPLICATE_GUIDE });
            break;
          case 'auth/invalid-email':
            setErrMessage({ emailErr: EMAIL_RULE_ERROR_GUIDE });
            break;
          case 'auth/weak-password':
            setErrMessage({ pwdErr: PASSWORD_RULE_ERROR_GUIDE });
            break;
          case 'auth/missing-password':
            setErrMessage({ pwdErr: PASSWORD_EMPTY_GUIDE });
            break;
          default:
            setErrMessage({ emailErr: '' });
        }
        return;
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
