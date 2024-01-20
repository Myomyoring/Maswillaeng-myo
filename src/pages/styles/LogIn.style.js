import styled from 'styled-components';
import tw from 'twin.macro';

export const LogInPageStyle = styled.div`
  ${tw`
        w-full h-screen
        flex justify-center items-center flex-col
        text-center
        bg-cover
        bg-[url('/src/statics/images/default_sign_in_image.jpg')]

        tablet:overflow-scroll
    `}
`;

export const LoginBox = styled.div`
  ${tw`
        my-10
        rounded-xl 
        bg-main bg-opacity-60

        tablet:w-1/2
        mobile:w-[320px] px-6 py-14 min-h-[400px] 
    `}
`;
