import { useState } from 'react';
import { getDownloadURL } from 'firebase/storage';

import { CONFIRM_MESSAGE, SIGN_UP_GUIDE } from '../../../constants/index.jsx';
import { emailRule, nicknameRule, passwordRule, phoneNumberRule } from '../../../utils/sign_up_rules.js';
import { useAuth } from '../../../contexts/ProvideAuthContext.jsx';
import { useRouter } from '../../../hooks/useRouter.jsx';
import { userService } from '../../../services/firebaseService/user.firebase.service.jsx';
import { imageService } from '../../../services/firebaseService/image.firebase.service.jsx';

import defaultImage from '../../../statics/images/default_user_image.jpg';
import SignUpFormPresenter from '../presenters/SignUpForm.presenter.jsx';

export default function SignUpFormContainer() {
  const [isLoading, setLoading] = useState(false);
  const { authRouteTo } = useRouter();
  const { signUp, setUserInfo } = useAuth();
  const [userImage, setUserImage] = useState(null);
  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    nickname: '',
    phoneNumber: '',
    introduction: '',
  });
  const { email, password, confirmPassword, nickname, phoneNumber, introduction } = form;
  const [error, setError] = useState({
    email: '',
    password: '',
    nickname: '',
    phoneNumber: '',
  });
  const onChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const [emailConfirm, setEmailConfirm] = useState(false);
  const [passwordConfirm, setPasswordConfirm] = useState(false);
  const [nicknameConfirm, setNicknameConfirm] = useState(false);
  const [phoneNumberConfirm, setPhoneNumberConfirm] = useState(false);

  const emailCheck = () => {
    if (!emailRule(email)) {
      setError({ email: CONFIRM_MESSAGE.EMAIL_RULE_ERROR });
      setEmailConfirm(false);
      return;
    }
    setEmailConfirm(true);
    setError({ email: '' });
  };

  const passwordCheck = () => {
    if (!passwordRule(password)) {
      setError({ password: CONFIRM_MESSAGE.PASSWORD_RULE_ERROR });
      setPasswordConfirm(false);
      return;
    } else if (password !== confirmPassword) {
      setError({ password: CONFIRM_MESSAGE.PASSWORD_CONFIRM_ERROR });
      setPasswordConfirm(false);
      return;
    }
    setError({ password: '' });
    setPasswordConfirm(true);
  };

  const nicknameCheck = () => {
    if (!nicknameRule(nickname)) {
      setError({
        nickname: CONFIRM_MESSAGE.NICKNAME_RULE_ERROR,
      });
      setNicknameConfirm(false);
      return;
    }
    setNicknameConfirm(true);
    setError({ nickname: '' });
  };

  const phoneNumberCheck = () => {
    if (!phoneNumberRule(phoneNumber)) {
      setError({
        phoneNumber: CONFIRM_MESSAGE.PHONE_NUMBER_RULE_ERROR,
      });
      setPhoneNumberConfirm(false);
      return;
    }
    setPhoneNumberConfirm(true);
    setError({ phoneNumber: '' });
  };

  const duplicateEmail = async (event) => {
    event.preventDefault();
    if (!emailRule(email)) {
      setEmailConfirm(false);
      return;
    }

    try {
      const response = await userService.duplicateEmail({ email });
      if (!response.empty) {
        setError({ email: CONFIRM_MESSAGE.DUPLICATE_ERROR });
        setEmailConfirm(false);
        return;
      }
      setError({ email: CONFIRM_MESSAGE.PASS_MESSAGE });
      setEmailConfirm(true);
    } catch (error) {
      console.log(error.message);
    }
  };

  const duplicateNickname = async (event) => {
    event.preventDefault();
    if (!nicknameRule(nickname)) {
      setNicknameConfirm(false);
      return;
    }

    try {
      const response = await userService.duplicateNickName({ nickname });
      if (!response.empty) {
        setError({ nickname: CONFIRM_MESSAGE.DUPLICATE_ERROR });
        setNicknameConfirm(false);
        return;
      }
      setError({ nickname: CONFIRM_MESSAGE.PASS_MESSAGE });
      setNicknameConfirm(true);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getImageURL = async ({ userId }) => {
    await imageService.deleteImage({ type: 'profile_images', fileName: 'null' });
    const uploadTask = await imageService.uploadImage({ type: 'profile_images', fileName: userId, userImage });
    const url = await getDownloadURL(uploadTask.ref);
    imageService.setImage({ filename: userId, url });
    return url;
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (!emailConfirm || !passwordConfirm || !nicknameConfirm || !phoneNumberConfirm) return;

    try {
      setLoading(true);
      const response = await signUp({ email, password });
      if (response.ok) {
        let url = null;
        if (userImage) {
          url = await getImageURL({ userId: response.id });
        }
        await setUserInfo({
          userId: response.id,
          userImage: url ?? defaultImage,
          email,
          password,
          nickname,
          phoneNumber,
          introduction,
        });
        authRouteTo('/login');
        alert(SIGN_UP_GUIDE.SIGN_UP_SUCCESS_MESSAGE);
      }
    } catch (error) {
      console.log(error);
      switch (error.code) {
        case 'auth/email-already-in-use':
          setError({ email: CONFIRM_MESSAGE.DUPLICATE_ERROR });
          break;
        case 'auth/invalid-email':
          setError({ email: CONFIRM_MESSAGE.EMAIL_RULE_ERROR });
          break;
        case 'auth/weak-password':
          setError({ password: CONFIRM_MESSAGE.PASSWORD_RULE_ERROR });
          break;
        case 'auth/missing-password':
          setError({ password: CONFIRM_MESSAGE.PASSWORD_EMPTY_ERROR });
          break;
        default:
          setError({ email: '' });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <SignUpFormPresenter
      {...{
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
        phoneNumberConfirm,
        duplicateEmail,
        duplicateNickname,
      }}
    />
  );
}
