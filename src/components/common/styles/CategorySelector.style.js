import styled from 'styled-components';
import tw from 'twin.macro';

export const CategorySelectorStyle = styled.select`
  ${tw`
      p-3 
      font-semibold text-center text-white bg-point
      border-none

      desktop:hidden
      tablet:hidden
      mobile:block
    `}
`;

export const CategoryOption = styled.option`
  ${tw``}
`;
