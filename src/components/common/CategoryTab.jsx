import CategoryTabBody from './CategoryTabBody';
import CategoryTabItem from './CategoryTabItem';

import { styled } from 'styled-components';
import tw from 'twin.macro';

const TabStyle = styled.div`
  ${tw`
      w-full h-14
      
      desktop:block
      tablet:block
      mobile:hidden
    `}
`;

export default function CategoryTab({ activeTabId, categories, setTab }) {
  return (
    <TabStyle>
      <CategoryTabBody size={categories.length}>
        <CategoryTabItem categories={categories} activeTabId={activeTabId} setTab={setTab} />
      </CategoryTabBody>
    </TabStyle>
  );
}
