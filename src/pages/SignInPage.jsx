import LoginForm from '../components/signIn/LoginForm';
import Logo from '../components/common/Logo';

import { styled } from 'styled-components';
import tw from 'twin.macro';

const SignInStyle = styled.div`
  ${tw`
        w-full h-screen
        flex justify-center items-center
        text-center
        bg-cover
        bg-[url('/src/statics/images/default_sign_in_image.jpg')]
    `}
`;
const Contents = styled.div`
  ${tw`
        px-44 py-20
        items-center
        rounded-xl 
        bg-main bg-opacity-70
  `}
`;

export default function SignInPage() {
  return (
    <SignInStyle>
      <Contents>
        <Logo />
        <LoginForm />
      </Contents>
    </SignInStyle>
  );
}
