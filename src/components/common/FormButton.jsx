import styled from 'styled-components';
import tw from 'twin.macro';

const Button = styled.button`
  ${tw`
        p-3
        bg-point
        font-bold text-white text-sm
        cursor-pointer
    `}
  ${(props) => (props.disabled ? tw`bg-gray cursor-not-allowed` : tw`bg-point`)}
`;
export default function EventButton({ children, ...rest }) {
  return <Button {...rest}>{children}</Button>;
}
