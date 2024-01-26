import { styled } from 'styled-components';
import tw from 'twin.macro';

const Ul = styled.ul`
  ${tw`
        h-14
        grid
    `}
  ${(props) => (props.className === 'user_page' ? tw`grid-cols-2` : tw`grid-cols-4`)}
`;
export default function CategoryTabBody({ size, children }) {
  return <Ul className={size === 2 ? 'user_page' : 'board_page'}>{children ? children : null}</Ul>;
}
