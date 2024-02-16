import styled from 'styled-components';
import tw from 'twin.macro';

export const PasswordConfirmViewStyle = styled.div`
  ${tw`
    w-full
    p-4
    flex justify-center items-center gap-3
  `}

  input {
    ${tw`
        h-10
    `}
  }
`;
