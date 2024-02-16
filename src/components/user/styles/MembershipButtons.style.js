import styled from 'styled-components';
import tw from 'twin.macro';

export const MembershipButtonsStyle = styled.div`
  ${tw`
      flex flex-col gap-4
    `}

  button {
    ${tw`
        text-md font-semibold text-darkgray
    `}
  }
`;
