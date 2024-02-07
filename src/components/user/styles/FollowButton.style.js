import styled from 'styled-components';
import tw from 'twin.macro';

export const FollowButtonStyle = styled.button`
  ${tw`
      w-[260px] h-10
      font-bold text-white text-sm
      rounded-md
      cursor-pointer
  `}
  ${(props) => (props.className ? tw`bg-gray` : tw`bg-point`)}
`;
