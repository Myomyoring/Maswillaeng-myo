import styled from 'styled-components';
import tw from 'twin.macro';

export const TitleBoxStyle = styled.div`
  ${tw`
      w-full
      flex justify-between
    `}
`;

export const CategorySelector = styled.select`
  ${tw`
      p-3 
      font-semibold text-center text-white bg-point
      border-none
    `}
`;

export const TitleInput = styled.input`
  ${tw`
      w-4/5
      px-3
    bg-white
      border-solid border-gray
    `}
`;
