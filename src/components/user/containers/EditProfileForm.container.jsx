import { useState } from 'react';

import { nicknameRule, passwordRule, phoneNumberRule } from '../../../utils/sign_up_rules';
import { useAuth } from '../../../context/ProvideAuthContext';
import EditProfileFormPresenter from '../presenters/EditProfileForm.presenter';
import { userService } from '../../../services/firebaseService/user.firebase.service';
import {
  DUPLICATE_GUIDE,
  NICKNAME_RULE_ERROR_GUIDE,
  PASSWORD_CONFIRM_ERROR_GUIDE,
  PASSWORD_EMPTY_GUIDE,
  PASSWORD_RULE_ERROR_GUIDE,
  PASS_GUIDE,
  PHONE_NUMBER_RULE_ERROR_GUIDE,
} from '../../../constants';
import { encodePassword } from '../../../utils/password_encoder';

export default function EditProfileFormContainer({ setModal }) {
  const { currentUser, logout } = useAuth();
  const user = currentUser();
  const [profileImg, setProfileImg] = useState(user.userImage);
  const [form, setForm] = useState({
    nickname: user.nickname,
    password: '',
    phoneNumber: '',
    introduction: user.introduction,
  });
  const { nickname, password, phoneNumber, introduction } = form;
  const [errMessage, setErrMessage] = useState({
    nickErr: '',
    passwordErr: '',
    newPwdErr: '',
    phoneNumberErr: '',
  });
  const [newPwds, setNewPwds] = useState({
    newPwd: '',
    newConfirmPwd: '',
  });
  const { newPwd, newConfirmPwd } = newPwds;

  const handleChange = ({ target }) => {
    const { name, value } = target;

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
      setErrMessage({
        nickErr: NICKNAME_RULE_ERROR_GUIDE,
      });
      setNicknameConfirm(false);
      return;
    } else {
      try {
        const response = await userService.duplicateNickName({ nickname });
        if (response.empty) {
          setErrMessage({ nickErr: PASS_GUIDE });
          setNicknameConfirm(true);
        } else if (nickname === user.nickname) {
          setErrMessage({ nickErr: '현재 닉네임 입니다.' });
          setNicknameConfirm(true);
        } else {
          setErrMessage({ nickErr: DUPLICATE_GUIDE });
          setNicknameConfirm(false);
        }
      } catch (error) {
        console.log(error.code);
      }
    }
  };

  const passwordCheck = async () => {
    if (password === '') {
      setErrMessage({ passwordErr: PASSWORD_EMPTY_GUIDE });
      setPasswordConfirm(false);
      return;
    }
    try {
      const pwd = encodePassword(password);
      const response = await userService.getUserById({ userId: user.id });
      response.forEach((doc) => {
        let data = doc.data();
        if (data.password === pwd) {
          setErrMessage({ passwordErr: '비밀번호가 일치합니다' });
          setPasswordConfirm(true);
        } else {
          setErrMessage({ passwordErr: '비밀번호가 일치하지 않습니다' });
          setPasswordConfirm(false);
          return;
        }
      });
    } catch (error) {
      console.log(error.code);
      return;
    }
  };

  const phoneNumberCheck = () => {
    if (phoneNumber === '' || !phoneNumberRule(phoneNumber)) {
      setErrMessage({
        phoneNumberErr: PHONE_NUMBER_RULE_ERROR_GUIDE,
      });
      setPhoneConfirm(false);
      return;
    } else {
      setErrMessage({
        phoneNumberErr: '',
      });
      setPhoneConfirm(true);
    }
  };

  const newPasswordCheck = () => {
    if (newPwd === '' && newConfirmPwd === '') {
      setErrMessage({ newPwdErr: '' });
      setNewPasswordConfirm(false);
      return;
    }

    if (newPwd === newConfirmPwd) {
      if (passwordRule(newPwd)) {
        setErrMessage({ newPwdErr: PASS_GUIDE });
        setNewPasswordConfirm(true);
      } else {
        setErrMessage({ newPwdErr: PASSWORD_RULE_ERROR_GUIDE });
        setNewPasswordConfirm(false);
        return;
      }
    } else {
      setErrMessage({ newPwdErr: PASSWORD_CONFIRM_ERROR_GUIDE });
      setNewPasswordConfirm(false);
      return;
    }
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (nicknameConfirm && passwordConfirm && phoneConfirm) {
      try {
        if (newPasswordConfirm) {
          await userService.updatePassword({ newPassword: newPwds.newPwd });
        }
        const pwd = encodePassword(newPasswordConfirm ? newPwds.newPwd : password);
        await userService.updateUser({
          userId: user.id,
          userImage: profileImg,
          password: pwd,
          nickname,
          phoneNumber,
          introduction,
        });
        await logout();
        setModal(false);
        alert('프로필 수정이 완료되었습니다. 다시 로그인 해주세요!');
      } catch (error) {
        console.log(error.code);
      }
    } else {
      alert('입력한 정보를 다시 확인해주세요.');
      return;
    }
  };

  return (
    <EditProfileFormPresenter
      {...{
        onSubmitHandler,
        form,
        profileImg,
        setProfileImg,
        handleChange,
        nicknameCheck,
        errMessage,
        passwordCheck,
        newPasswordCheck,
        phoneNumberCheck,
        newPwds,
      }}
    />
  );
}
