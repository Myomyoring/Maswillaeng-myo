import LoginForm from '../components/logIn/containers/LoginForm.container';
import Logo from '../components/common/Logo';

import { styled } from 'styled-components';
import tw from 'twin.macro';

const LogInPageStyle = styled.div`
  ${tw`
        w-full h-screen
        flex justify-center items-center flex-col
        text-center
        bg-cover
        bg-[url('/src/statics/images/default_sign_in_image.jpg')]

        tablet:overflow-scroll
    `}
`;

const Box = styled.div`
  ${tw`
        my-10
        rounded-xl 
        bg-main bg-opacity-60

        tablet:w-1/2
        mobile:w-[320px] px-6 py-14 min-h-[400px] 
    `}
`;

export default function LogInPage() {
  return (
    <LogInPageStyle>
      <Logo color="white" size="big" />
      <Box>
        <LoginForm />
      </Box>
    </LogInPageStyle>
  );
}
