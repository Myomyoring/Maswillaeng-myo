import { useState } from 'react';
import { styled } from 'styled-components';
import tw from 'twin.macro';

import { nicknameRule, passwordRule, phoneNumberRule } from '../../utils/signUpRules';
import ImageInput from '../signUp/ImageInput';
import DefaultUserImage from '../../statics/images/default_user_image.jpg';
import axios from 'axios';
import { AuthContext } from '../../auth/ProvideAuthContext';
import { useNavigate } from 'react-router-dom';

const Modal = styled.div`
  ${tw`
        w-full h-screen
        absolute
        flex justify-center items-center
        bg-darkgray bg-opacity-70
        text-sm
    `}
`;

const Container = styled.div`
  ${tw`
        w-1/2 h-[100]
        bg-main
    `}
`;

const Cap = styled.div`
  ${tw`
        flex
        justify-between items-center
        
    `}
`;

const Title = styled.span`
  ${tw`
    mx-5

    `}
`;

const CloseButton = styled.button`
  ${tw`
        w-10 h-10
    `}
`;

const Form = styled.form`
  ${tw`
        flex flex-wrap
    `}
`;

const ProfileImage = styled.div`
  ${tw`
        w-1/3
        px-20
        flex
        justify-center items-center
    `}
`;

const Div = styled.div`
  ${tw`
        w-2/3
        pl-24
        // m-auto
        // flex 
        // justify-center
        // items-center
    `}
`;

const InputDiv = styled.div`
  ${tw`
    border-0 border-solid border-b border-gray
    `}
`;

const InputName = styled.div`
  ${tw`
        py-1
    `}
`;

const Span = styled.span`
  ${tw`
      text-xs text-darkgray px-2
  `}
`;

const Input = styled.input`
  ${tw`
        w-1/2 h-5
        my-2 p-1
        bg-white
        border-none
        outline
        outline-gray
    `}
`;

const Error = styled.div`
  ${tw`
      pb-1
      text-xs text-point
  `}//   ${(props) => (props.onBlur ? tw`hidden` : tw``)}
`;

const Buttons = styled.div`
  ${tw`
        w-full
        flex
        justify-end
    `}
`;

const Button = styled.a`
  ${tw`
        m-2 p-2
        bg-point
        text-sm text-white
        cursor-pointer
    `}
`;

const SubmitButton = styled.button`
  ${tw`
        m-2 p-2
        bg-point
        text-sm text-white
    `}
`;

export default function EditProfileModal({ setModal, user }) {
  const navigate = useNavigate();
  const { getUserToken, getUser, refresh } = AuthContext();
  const [profileImg, setProfileImg] = useState(user.profileImage);
  const [form, setForm] = useState({
    nickname: user.nickname,
    password: '',
    phoneNumber: '',
    introduction: user.introduction,
  });
  const { userImage, nickname, password, phoneNumber, introduction } = form;
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
      console.log(newPwds);
    } else {
      setForm({ ...form, [name]: value });
      console.log(form);
    }
  };

  const [nicknameConfirm, setNicknameConfirm] = useState(false);
  const [passwordConfirm, setPasswordConfirm] = useState(false);
  const [newPasswordConfirm, setNewPasswordConfirm] = useState(false);
  const [phoneConfirm, setPhoneConfirm] = useState(false);

  const ruleCheck = ({ target }) => {
    const { name } = target;

    const nicknameCheck = async () => {
      if (!nicknameRule(nickname)) {
        setErrMessage({
          nickErr: '2~10자리의 한글이나 영문으로 이루어진 닉네임을 작성해주세요.',
        });
        return;
      } else {
        try {
          const response = await axios.post('/api/auth/duplicate/nickname', { nickname });
          console.log(response);
          if (response.statusText === 'OK') {
            setErrMessage({ nickErr: '사용 가능' });
            setNicknameConfirm(true);
          }
        } catch (err) {
          console.log(err);
          if (err.response.status === 409) {
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
        return;
      }
      try {
        const token = getUserToken();
        if (!token) return;

        const res = await axios.post(
          '/api/auth/password',
          {
            userId: user.id,
            password: password,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        console.log(res);
        if (res.data) {
          setErrMessage({ passwordErr: '비밀번호가 일치합니다' });
          setPasswordConfirm(true);
        } else {
          setErrMessage({ passwordErr: '비밀번호가 일치하지 않습니다' });
          setPasswordConfirm(false);
          return;
        }
      } catch (err) {
        console.log(err);
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
      console.log('동작');
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

    switch (name) {
      case 'nickname':
        nicknameCheck();
        break;
      case 'password':
        passwordCheck();
        break;
      case 'phoneNumber':
        phoneNumberCheck();
        break;
      case 'newPwd':
        newPasswordCheck();
        break;
      case 'newConfirmPwd':
        newPasswordCheck();
        break;
      default:
        return false;
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    console.log(form);

    if (nicknameConfirm && passwordConfirm && phoneConfirm) {
      try {
        const token = getUserToken();
        if (!token) return;

        const response = await axios.put(
          `/api/user`,
          {
            password: newPasswordConfirm ? newPwds.newPwd : password,
            phoneNumber,
            nickname,
            userImage: profileImg,
            introduction,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        console.log(response);
        if (response.statusText === 'OK') {
          getUser(user.id);
          setModal(false);
          navigate(`/user/${nickname}`, { replace: true });
          alert('프로필 수정이 완료되었습니다.');
        }
      } catch (err) {
        console.log(err);
        alert('프로필 수정 에러');
      }
    } else {
      alert('입력한 정보를 다시 확인해주세요.');
      return;
    }
  };

  return (
    <Modal>
      <Container>
        <Cap>
          <Title>프로필 수정</Title>
          <CloseButton onClick={() => setModal(false)}>X</CloseButton>
        </Cap>

        <Form onSubmit={onSubmitHandler}>
          <ProfileImage>
            <ImageInput
              defaultImg={DefaultUserImage}
              currentImg={profileImg}
              image={setProfileImg}
            />
          </ProfileImage>

          <Div>
            <InputDiv>
              <InputName>
                닉네임
                <Span>* 한글, 영문 2~10자 입력</Span>
              </InputName>
              <Input
                type="text"
                name="nickname"
                value={nickname}
                onChange={handleChange}
                placeholder="닉네임 입력"
              />
              <Button name="nickname" onClick={ruleCheck}>
                중복확인
              </Button>
              <Error>{errMessage.nickErr}</Error>
            </InputDiv>
            <InputDiv>
              <InputName>현재 비밀번호</InputName>
              <Input
                type="password"
                name="password"
                value={password}
                onChange={handleChange}
                onBlur={ruleCheck}
                placeholder="비밀번호 입력"
              />
              <Error>{errMessage.passwordErr}</Error>
            </InputDiv>
            <InputDiv>
              <InputName>
                새 비밀번호
                <Span>* 영문, 숫자 포함 8~16자 입력</Span>
              </InputName>
              <Input
                type="password"
                name="newPwd"
                value={newPwd}
                onChange={handleChange}
                onBlur={ruleCheck}
                placeholder="새 비밀번호 입력"
              />
            </InputDiv>
            <InputDiv>
              <InputName>새 비밀번호 확인</InputName>
              <Input
                type="password"
                name="newConfirmPwd"
                value={newConfirmPwd}
                onChange={handleChange}
                onBlur={ruleCheck}
                placeholder="새 비밀번호 확인"
              />
              <Error>{errMessage.newPwdErr}</Error>
            </InputDiv>
            <InputDiv>
              <InputName>
                휴대전화
                <Span>ex) 01012345678</Span>
              </InputName>
              <Input
                type="text"
                name="phoneNumber"
                value={phoneNumber}
                onChange={handleChange}
                onBlur={ruleCheck}
                placeholder="전화번호 입력"
              />
              <Error>{errMessage.phoneNumberErr}</Error>
            </InputDiv>
            <InputDiv>
              <InputName>
                자기소개
                <Span>* 최대 30자까지 입력 가능</Span>
              </InputName>
              <Input
                type="text"
                name="introduction"
                value={introduction}
                onChange={handleChange}
                placeholder="소개글을 작성해주세요"
                maxLength="30"
              />
            </InputDiv>
          </Div>
          <Buttons>
            <SubmitButton>수정</SubmitButton>
            <Button onClick={() => setModal(false)}>취소</Button>
          </Buttons>
        </Form>
      </Container>
    </Modal>
  );
}
