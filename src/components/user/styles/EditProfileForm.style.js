import styled from 'styled-components';
import tw from 'twin.macro';

export const EditProfileFormStyle = styled.div`
  ${tw`
        m-2
    `}
`;

export const Form = styled.form`
  ${tw`
      desktop:grid grid-cols-3
      tablet:grid grid-cols-3
    `}
`;

export const EditProfileImage = styled.div`
  ${tw`
      flex items-center
    `}
`;

export const UserInfoBox = styled.div`
  ${tw`
      col-span-2
      grid gap-3
      
      desktop:mx-32
      tablet:mx-12
  `}
`;

export const Div = styled.div`
  ${tw`
      flex justify-between items-center
  `}
`;

export const InputBox = styled.div`
  ${tw`
      flex flex-col gap-1
  `}

  input[name='nickname'] {
    ${tw`
        w-1/2
    `}
  }

  button {
    ${tw` w-1/3 h-7
          p-1
      `}
  }
`;

export const InputTitle = styled.div`
  ${tw`
      flex justify-between items-center
    `}
`;

export const GuideText = styled.span`
  ${tw`
      text-xs text-darkgray
  `}
`;

export const Input = styled.input`
  ${tw`
        w-full h-6
        p-1
        bg-white
        border-none
        outline
        outline-gray
    `}
`;

export const ErrorBox = styled.div`
  ${tw`
      pb-1
      text-xs text-point text-left
  `}
`;

export const ButtonBox = styled.div`
  ${tw`
        col-span-3
        flex justify-end
        pt-3
    `}
`;
