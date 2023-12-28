import Logo from '../components/common/Logo';
import SignUpForm from '../components/signUp/containers/SignUpForm.container';

import { styled } from 'styled-components';
import tw from 'twin.macro';

const SignUpPageStyle = styled.div`
  ${tw`
      w-[500px]
      mx-auto p-10
      text-center
    `}
`;

export default function SignUpPage() {
  return (
    <SignUpPageStyle>
      <Logo size="big" />
      <SignUpForm />
    </SignUpPageStyle>
  );
}
