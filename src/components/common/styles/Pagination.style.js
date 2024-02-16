import styled from 'styled-components';
import tw from 'twin.macro';

export const PaginationStyle = styled.div`
  ${tw`
      flex justify-center gap-2
      mt-7
  `}
`;

export const PrevButton = styled.button`
  ${tw``}
`;

export const NextButton = styled.button`
  ${tw``}
`;

export const PageButton = styled.button`
  ${tw``}
`;

export const NumberText = styled.span`
  ${tw`text-lg`}

  ${(props) => (props.className === 'active' ? tw`text-point font-bold` : tw`text-darkgray`)}
`;
