import { styled } from 'styled-components';
import tw from 'twin.macro';

const Ul = styled.ul`
  ${tw`
        w-full h-12
        flex justify-center
    `}
`;
export default function CategoryTabBody({ children }) {
  return <Ul>{children ? children : null}</Ul>;
}
