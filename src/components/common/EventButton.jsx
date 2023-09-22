import styled from 'styled-components';
import tw from 'twin.macro';

const Button = styled.button`
  ${tw`
        mx-2 p-3
        bg-point
        font-bold text-white text-sm
        cursor-pointer
    `}
`;
export default function EventButton({ children, onClick }) {
  return <Button {...{ onClick }}>{children}</Button>;
}
