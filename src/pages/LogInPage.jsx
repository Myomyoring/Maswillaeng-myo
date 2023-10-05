import LoginForm from '../components/logIn/containers/LoginForm.container';
import Logo from '../components/common/Logo';

import { styled } from 'styled-components';
import tw from 'twin.macro';

const LogInStyle = styled.div`
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
        rounded-xl 
        bg-main bg-opacity-70
    `}
`;

export default function LogInPage() {
  return (
    <LogInStyle>
      <Contents>
        <Logo />
        <LoginForm />
      </Contents>
    </LogInStyle>
  );
}
