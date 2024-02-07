import styled from 'styled-components';
import tw from 'twin.macro';

export const UserPageStyle = styled.div`
  ${tw`
        grid
        text-center

        tablet:grid-cols-[1fr_2fr]
        mobile:grid-cols-1 gap-6
  `}
`;
