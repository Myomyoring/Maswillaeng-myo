import CategoryTabBody from './CategoryTabBody';
import CategoryTabItem from './CategoryTabItem';

import { styled } from 'styled-components';
import tw from 'twin.macro';

const TabStyle = styled.div`
  ${tw`
      w-full h-12
    `}
`;

export default function CategoryTab({ active, categories, setTab }) {
  return (
    <TabStyle>
      <CategoryTabBody>
        <CategoryTabItem categories={categories} active={active} setTab={setTab} />
      </CategoryTabBody>
    </TabStyle>
  );
}
