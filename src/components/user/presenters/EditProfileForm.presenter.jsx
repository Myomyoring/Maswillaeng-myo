import ProfileImageInput from '../../common/ProfileImageInput';
import DefaultUserImage from '../../../statics/images/default_user_image.jpg';
import DuplicateButton from '../../common/EventButton';
import SubmitButton from '../../common/FormButton';

import styled from 'styled-components';
import tw from 'twin.macro';

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

const InputBox = styled.div`
  ${tw`
    border-0 border-solid border-b border-gray
    `}
`;

const InputName = styled.div`
  ${tw`
        py-1
    `}
`;

const Guide = styled.span`
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
  `}
`;

const Buttons = styled.div`
  ${tw`
        w-full
        flex
        justify-end
    `}
`;

export default function EditProfileFormPresenter({
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
}) {
  return (
    <Form onSubmit={onSubmitHandler}>
      <ProfileImage>
        <ProfileImageInput defaultImage={DefaultUserImage} currentImage={profileImg} setImage={setProfileImg} />
      </ProfileImage>

      <Div>
        <InputBox>
          <InputName>
            * 닉네임
            <Guide>* 한글, 영문 2~10자 입력</Guide>
          </InputName>
          <Input type="text" name="nickname" value={form.nickname} onChange={handleChange} placeholder="닉네임 입력" />
          <DuplicateButton name="nickname" onClick={nicknameCheck}>
            중복확인
          </DuplicateButton>
          <Error>{errMessage.nickErr}</Error>
        </InputBox>
        <InputBox>
          <InputName>* 현재 비밀번호</InputName>
          <Input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            onBlur={passwordCheck}
            placeholder="비밀번호 입력"
          />
          <Error>{errMessage.passwordErr}</Error>
        </InputBox>
        <InputBox>
          <InputName>
            새 비밀번호
            <Guide>* 영문, 숫자 포함 8~16자 입력</Guide>
          </InputName>
          <Input
            type="password"
            name="newPwd"
            value={newPwds.newPwd}
            onChange={handleChange}
            onBlur={newPasswordCheck}
            placeholder="새 비밀번호 입력"
          />
        </InputBox>
        <InputBox>
          <InputName>새 비밀번호 확인</InputName>
          <Input
            type="password"
            name="newConfirmPwd"
            value={newPwds.newConfirmPwd}
            onChange={handleChange}
            onBlur={newPasswordCheck}
            placeholder="새 비밀번호 확인"
          />
          <Error>{errMessage.newPwdErr}</Error>
        </InputBox>
        <InputBox>
          <InputName>
            * 휴대전화
            <Guide>ex) 01012345678</Guide>
          </InputName>
          <Input
            type="text"
            name="phoneNumber"
            value={form.phoneNumber}
            onChange={handleChange}
            onBlur={phoneNumberCheck}
            placeholder="전화번호 입력"
          />
          <Error>{errMessage.phoneNumberErr}</Error>
        </InputBox>
        <InputBox>
          <InputName>
            자기소개
            <Guide>* 최대 30자까지 입력 가능</Guide>
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
      </Div>
      <Buttons>
        <SubmitButton>수정</SubmitButton>
      </Buttons>
    </Form>
  );
}
