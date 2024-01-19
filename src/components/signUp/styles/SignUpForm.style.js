import styled from 'styled-components';
import tw from 'twin.macro';

export const SignUpFormStyle = styled.div`
  ${tw``}
`;

export const Form = styled.form`
  ${tw``}
`;

export const InputTitle = styled.div`
  ${tw`
      pt-2
      text-sm
  `}
`;

export const InputBox = styled.div`
  ${tw`
      relative
      text-left
  `}

  input[name="email"], input[name="nickname"] {
    ${tw`
         max-w-[318px] mr-7
    `}
  }

  svg {
    ${tw`
        absolute right-2 top-10
    `}
  }
`;

export const Input = styled.input`
  ${tw`
      w-full h-10
      my-2 p-2
      bg-white
      border-none
      outline
      outline-gray
  `}

  &:focus {
    ${tw`outline-point`}
  }
  &:last-child {
    ${tw`mb-10`}
  }

  ${(props) => (props.type === 'file' ? tw`hidden` : tw``)}
`;

export const GuideText = styled.span`
  ${tw`
      text-xs text-darkgray px-2
  `}
`;

export const ErrorBox = styled.div`
  ${tw`
      pb-1
      text-xs text-point
  `}
  ${(props) => (props.onBlur ? tw`hidden` : tw``)}
`;
