import styled from 'styled-components';
import tw from 'twin.macro';

export const ProfileImageInputStyle = styled.div`
  ${tw`
        w-40 h-40
        relative
        mx-auto
        text-center
    `}
`;

export const Image = styled.img`
  ${tw`
        w-40 h-40
        rounded-full
        border-solid border-gray border-[1px]
    `}
`;

export const Input = styled.input`
  ${tw``}
`;

export const AddFileLabel = styled.label`
  ${tw`
        cursor-pointer
    `}
  svg {
    ${tw`
          absolute
          top-32 right-28
      `}
  }
`;
