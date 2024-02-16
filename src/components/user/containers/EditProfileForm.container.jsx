import { useState } from 'react';

import { CONFIRM_MESSAGE, USER_MESSAGE } from '../../../constants';
import { encryptPassword } from '../../../utils/password_encoder';
import { nicknameRule, passwordRule, phoneNumberRule } from '../../../utils/sign_up_rules';
import { useAuth } from '../../../contexts/ProvideAuthContext';
import { userService } from '../../../services/firebaseService/user.firebase.service';
import EditProfileFormPresenter from '../presenters/EditProfileForm.presenter';

export default function EditProfileFormContainer({ setModal }) {
  const [isLoading, setLoading] = useState(false);
  const { currentUser, logOut, userCredential } = useAuth();
  const user = currentUser();
  const [profileImage, setProfileImage] = useState(user.userImage);
  const [form, setForm] = useState({
    nickname: user.nickname,
    password: '',
    phoneNumber: '',
    introduction: user.introduction,
  });
  const { nickname, password, phoneNumber, introduction } = form;
  const [error, setError] = useState({
    nickname: '',
    password: '',
    newPwd: '',
    phoneNumber: '',
  });
  const [newPwds, setNewPwds] = useState({
    newPwd: '',
    newConfirmPwd: '',
  });
  const { newPwd, newConfirmPwd } = newPwds;

  const onChange = (event) => {
    const { name, value } = event.target;

    if (name === 'newPwd' || name === 'newConfirmPwd') {
      setNewPwds({ ...newPwds, [name]: value });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const [nicknameConfirm, setNicknameConfirm] = useState(false);
  const [passwordConfirm, setPasswordConfirm] = useState(false);
  const [newPasswordConfirm, setNewPasswordConfirm] = useState(false);
  const [phoneConfirm, setPhoneConfirm] = useState(false);

  const nicknameCheck = async (event) => {
    event.preventDefault();
    if (!nicknameRule(nickname)) {
      setError({
        nickname: CONFIRM_MESSAGE.NICKNAME_RULE_ERROR,
      });
      setNicknameConfirm(false);
      return;
    }
    try {
      setLoading(true);
      const response = await userService.duplicateNickName({ nickname });
      if (response.empty) {
        setError({ nickname: CONFIRM_MESSAGE.PASS_MESSAGE });
        setNicknameConfirm(true);
      } else if (nickname === user.nickname) {
        setError({ nickname: '' });
        setNicknameConfirm(true);
      } else {
        setError({ nickname: CONFIRM_MESSAGE.DUPLICATE_ERROR });
        setNicknameConfirm(false);
      }
    } catch (error) {
      console.log(error.code);
    } finally {
      setLoading(false);
    }
  };

  const passwordCheck = async () => {
    if (password === '') {
      setError({ password: CONFIRM_MESSAGE.PASSWORD_EMPTY_ERROR });
      setPasswordConfirm(false);
      return;
    }
    try {
      const encryptPw = encryptPassword(password);
      const response = await userService.getUserById({ userId: user.userId });
      response.forEach((doc) => {
        const { password } = doc.data();
        if (password !== encryptPw) {
          setError({ password: CONFIRM_MESSAGE.PASSWORD_CONFIRM_ERROR });
          setPasswordConfirm(false);
          return;
        }
      });
      setError({ password: CONFIRM_MESSAGE.PASSWORD_PASS });
      setPasswordConfirm(true);
    } catch (error) {
      console.log(error.code);
    }
  };

  const phoneNumberCheck = () => {
    if (phoneNumber === '' || !phoneNumberRule(phoneNumber)) {
      setError({
        phoneNumber: CONFIRM_MESSAGE.PHONE_NUMBER_RULE_ERROR,
      });
      setPhoneConfirm(false);
      return;
    }
    setError({ phoneNumber: '' });
    setPhoneConfirm(true);
  };

  const newPasswordCheck = () => {
    if (newPwd === '' && newConfirmPwd === '') {
      setError({ newPwd: '' });
      setNewPasswordConfirm(false);
      return;
    }
    if (newPwd === newConfirmPwd) {
      if (!passwordRule(newPwd)) {
        setError({ newPwd: CONFIRM_MESSAGE.PASSWORD_RULE_ERROR });
        setNewPasswordConfirm(false);
        return;
      }
      setError({ newPwd: CONFIRM_MESSAGE.PASS_MESSAGE });
      setNewPasswordConfirm(true);
    } else {
      setError({ newPwd: CONFIRM_MESSAGE.PASSWORD_CONFIRM_ERROR });
      setNewPasswordConfirm(false);
      return;
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (user.nickname === nickname) {
      setNicknameConfirm(true);
    }
    if (!nicknameConfirm || !passwordConfirm || !phoneConfirm) {
      alert(USER_MESSAGE.EDIT_PROFILE_ERROR);
      return;
    }
    try {
      setLoading(true);
      if (newPasswordConfirm) {
        const result = await userCredential(password);
        if (!result) return;
        await userService.updatePassword({ newPassword: newPwds.newPwd });
      }
      const encryptPw = encryptPassword(newPasswordConfirm ? newPwds.newPwd : password);
      console.log(profileImage);
      await userService.updateUser({
        userId: user.userId,
        userImage: profileImage,
        password: encryptPw,
        nickname,
        phoneNumber,
        introduction,
      });
      await logOut();
      setModal(false);
      alert(USER_MESSAGE.EDIT_PROFILE_SUCCESS_MESSAGE);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <EditProfileFormPresenter
      {...{
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
      }}
    />
  );
}
