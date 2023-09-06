import { styled } from 'styled-components';
import tw from 'twin.macro';

import CategoryTabBody from '../boardList/CategoryTabBody';
import CategoryTabItem from '../boardList/CategoryTabItem';
import UserCategories from './UserCategories';

const ToggleStyle = styled.div`
  ${tw`
    // w-full
  `}
`;

export default function UserTab({ active, setTab }) {
  return (
    <ToggleStyle>
      <CategoryTabBody>
        <CategoryTabItem categories={UserCategories} active={active} setTab={setTab} />
      </CategoryTabBody>
    </ToggleStyle>
  );
}
