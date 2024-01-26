import { styled } from 'styled-components';
import tw from 'twin.macro';

const Li = styled.li`
  ${tw`
        flex justify-center items-center
        cursor-pointer
        border-point border-solid
        font-bold text-lg
    `}
  ${(props) =>
    props.className === 'active'
      ? tw`border-x-[3px] border-t-[3px] border-b-0`
      : tw`border-0 border-b-[3px] text-darkgray`}
`;

const TitleText = styled.span`
  ${tw``}
`;

export default function CategoryTabItem({ categories, activeTabId, setTab }) {
  return (
    <>
      {categories
        ? categories.map((category) => (
            <Li
              className={category.id === activeTabId ? 'active' : ''}
              key={category.id}
              onClick={() => setTab(category.id)}
            >
              <TitleText>{category.title}</TitleText>
            </Li>
          ))
        : null}
    </>
  );
}
