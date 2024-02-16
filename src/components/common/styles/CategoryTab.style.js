import styled from 'styled-components';
import tw from 'twin.macro';

export const CategoryTabStyle = styled.div`
  ${tw`
      w-full h-14
      
      desktop:block
      tablet:block
      mobile:hidden
    `}
`;

export const Ul = styled.ul`
  ${tw`
        h-14
        grid
    `}
  ${(props) => (props.className === 'user_page' ? tw`grid-cols-2` : tw`grid-cols-4`)}
`;

export const Li = styled.li`
  ${tw`
        flex justify-center items-center
        cursor-pointer
        border-point border-solid
        font-bold text-lg
    `}
  ${(props) =>
    props.className === 'active'
      ? tw`border-x-[3px] border-t-[3px] border-b-0`
      : tw`border-0 border-b-[3px] text-darkgray`}
`;

export const TitleText = styled.span`
  ${tw``}
`;
