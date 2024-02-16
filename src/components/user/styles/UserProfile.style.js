import styled from 'styled-components';
import tw from 'twin.macro';

export const UserProfileStyle = styled.div`
  ${tw`
      p-10
      flex flex-col gap-8 items-center

      desktop:mt-20
    `}
`;

export const ProfileImage = styled.div`
  ${tw``}
`;

export const Image = styled.img`
  ${tw`
      w-40 h-40
      rounded-full
      outline
      object-cover
    `}
`;

export const NicknameBox = styled.div`
  ${tw`
      text-3xl font-bold
  `}
`;

export const ProfileButton = styled.button`
  ${tw``}
`;

export const IntroductionBox = styled.div`
  ${tw`text-lg`}
`;
