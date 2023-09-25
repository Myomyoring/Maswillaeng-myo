import Logo from '../components/common/Logo';
import SignUpForm from '../components/signUp/SignUpForm';

import { styled } from 'styled-components';
import tw from 'twin.macro';

const SignUpStyle = styled.div`
  ${tw`
      w-96
      mx-auto p-10
      text-center
    `}
  h1 {
    ${tw`
        text-4xl
        text-point
      `}
  }
`;

export default function SignUpPage() {
  return (
    <SignUpStyle>
      <Logo className="logo" />
      <SignUpForm />
    </SignUpStyle>
  );
}
