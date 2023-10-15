import { useState } from 'react';

import { nicknameRule, passwordRule, phoneNumberRule } from '../../../utils/sign_up_rules';
import { useAuth } from '../../../context/ProvideAuthContext';
import EditProfileFormPresenter from '../presenters/EditProfileForm.presenter';

export default function EditProfileFormContainer({ setModal }) {
  const { getUserToken, currentUser } = useAuth();
  const user = currentUser();
  const token = getUserToken();
  const [profileImg, setProfileImg] = useState(user.profileImage);
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

  const nicknameCheck = async () => {
    if (!nicknameRule(nickname)) {
      setErrMessage({
        nickErr: '2~10자리의 한글이나 영문으로 이루어진 닉네임을 작성해주세요.',
      });
      setNicknameConfirm(false);
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
          if (nickname === user.nickname) {
            setErrMessage({ nickErr: '현재 닉네임과 같습니다' });
            setNicknameConfirm(true);
          } else {
            setErrMessage({ nickErr: '이미 존재하는 닉네임' });
            setNicknameConfirm(false);
            return;
          }
        }
      }
    }
  };

  const passwordCheck = async () => {
    if (password === '') {
      setErrMessage({ passwordErr: '비밀번호를 입력해주세요' });
      setPasswordConfirm(false);
      return;
    }
    try {
      if (!token) return;
      const response = await userService.duplicatePassword({ userId: user.id, password, token });
      console.log(response);
      if (response.data) {
        setErrMessage({ passwordErr: '비밀번호가 일치합니다' });
        setPasswordConfirm(true);
      } else {
        setErrMessage({ passwordErr: '비밀번호가 일치하지 않습니다' });
        setPasswordConfirm(false);
        return;
      }
    } catch (error) {
      console.log(error.message);
      setPasswordConfirm(false);
      return;
    }
  };

  const phoneNumberCheck = () => {
    if (phoneNumber === '' || !phoneNumberRule(phoneNumber)) {
      setErrMessage({
        phoneNumberErr: "'-' 를 제외한 10~11자의 올바른 핸드폰 번호를 작성해주세요.",
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
        setErrMessage({ newPwdErr: '새 비밀번호가 일치합니다' });
        setNewPasswordConfirm(true);
      } else {
        setErrMessage({ newPwdErr: '영문과 숫자를 포함하여 8~15자를 작성해주세요' });
        setNewPasswordConfirm(false);
        return;
      }
    } else {
      setErrMessage({ newPwdErr: '새 비밀번호가 일치하지 않습니다' });
      setNewPasswordConfirm(false);
      return;
    }
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (nicknameConfirm && passwordConfirm && phoneConfirm) {
      try {
        const token = getUserToken();
        if (!token) return;

        const response = await userService.updateUser({
          password: newPasswordConfirm ? newPwds.newPwd : password,
          phoneNumber,
          nickname,
          userImage: profileImg,
          introduction,
          token,
        });

        console.log(response);
        if (response.statusText === 'OK') {
          setModal(false);
          window.location.replace(`/user/${nickname}`);
          alert('프로필 수정이 완료되었습니다.');
        }
      } catch (error) {
        console.log(error.message);
        alert('프로필 수정 에러');
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
