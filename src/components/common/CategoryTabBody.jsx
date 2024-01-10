import { styled } from 'styled-components';
import tw from 'twin.macro';

const Ul = styled.ul`
  ${tw`
        h-12
        grid
    `}
  ${(props) => (props.className === 'user_page' ? tw`grid-cols-2` : tw`grid-cols-4`)}
`;
export default function CategoryTabBody({ length, children }) {
  return <Ul className={length === 2 ? 'user_page' : 'board_page'}>{children ? children : null}</Ul>;
}
