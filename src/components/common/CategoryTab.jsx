import CategoryTabBody from './CategoryTabBody';
import CategoryTabItem from './CategoryTabItem';

import { styled } from 'styled-components';
import tw from 'twin.macro';

const TabStyle = styled.div`
  ${tw`
      w-full h-12
      
      desktop:block
      tablet:block
      mobile:hidden
    `}
`;

export default function CategoryTab({ active, categories, setTab }) {
  return (
    <TabStyle>
      <CategoryTabBody length={categories.length}>
        <CategoryTabItem categories={categories} active={active} setTab={setTab} />
      </CategoryTabBody>
    </TabStyle>
  );
}
