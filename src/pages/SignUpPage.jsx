import React from 'react';
import { styled } from 'styled-components';
import tw from 'twin.macro';
import ImageInput from '../components/signUp/ImageInput';
import PwdCheckIcon from '../statics/svg/pwdCheckIcon';
import PwdLockIcon from '../statics/svg/pwdLockIcon';


const SignUpContainer = styled.div`
  ${tw`
      w-96
      mx-auto pb-20
      text-center
    `}
`

const Logo = styled.h1`
  ${tw`
      my-7
      font-extrabold text-point text-4xl

  `}
`

const Form = styled.form`
  ${tw`
      
    `}
`

const Label = styled.label`
  ${tw`
      pt-2
      block
      text-sm
  `}
`

const InputBox = styled.div`
  ${tw`
      text-left
  `}

  #email, #nickname {
    ${tw`
       w-4/6 mr-8
    `}
  } 

  span {
    ${tw`
        text-xs text-darkgray px-2
    `}
  }
`
const Input = styled.input` 
  ${tw`
      w-full h-10
      my-2 p-2
      bg-white
      border-none
      outline
      outline-gray
  `}
  
  ${props => props.type === "file" ? tw `hidden` : tw ``}
`

const DuplicateButton = styled.button`
    ${tw`
        w-24 h-10 
      bg-point
        font-bold text-white
    `}
`

const SignUpButton = styled.button`
    ${tw`
      w-full h-12 
      my-2
    bg-point
      font-bold text-white
    `}
`

export default function SignUpPage() {
    return (
        <SignUpContainer>
          <Logo>MASHILLAENG</Logo>  
          <Form>
              <ImageInput />
              <InputBox>
                <Label>자기소개</Label>
                  <Input
                    type="text"
                    placeholder="소개글을 작성해주세요"
                    />
              </InputBox>
              <InputBox>
                <Label>아이디(이메일)</Label>
                  <Input
                    type="text"
                    id="email"
                    placeholder="이메일 입력"
                    />
              <DuplicateButton>중복확인</DuplicateButton>
              </InputBox>
              <InputBox>
              <Label>비밀번호</Label>
                <Input
                  type="password"
                  placeholder="비밀번호 입력"
                  />
              <Label>비밀번호 재확인</Label>
                <Input
                  type="password"
                  placeholder="비밀번호 재입력"
                  />
                <PwdCheckIcon />
                <PwdLockIcon />
              </InputBox>
              <InputBox>
                <Label>닉네임</Label>
                  <Input
                    type="text"
                    id="nickname"
                    placeholder="닉네임 입력"
                    />
                <DuplicateButton>중복확인</DuplicateButton>
              </InputBox>
              <InputBox>
                <Label>휴대전화
                  <span>
                    ex) 01012345678
                  </span>
                </Label>
                <Input
                  type="text"
                  placeholder="전화번호 입력"
                  />
              </InputBox>
              <SignUpButton>가입하기</SignUpButton>
          </Form>
      </SignUpContainer>
    );
  }