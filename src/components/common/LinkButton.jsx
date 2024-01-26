import { Link } from 'react-router-dom';

import styled from 'styled-components';
import tw from 'twin.macro';

const Anchor = styled(Link)`
  ${tw`
    p-3
    bg-point
    text-white
  `}
`;

export default function LinkButton({ children, to }) {
  return <Anchor {...{ to }}>{children}</Anchor>;
}
