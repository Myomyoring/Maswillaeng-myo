import { styled } from 'styled-components';
import tw from 'twin.macro';

const Li = styled.li`
  ${tw`
        p-5
        text-center
        cursor-pointer
        border-point border-solid
    `}
  ${(props) =>
    props.className === 'active' ? tw`font-bold border-x-[3px] border-t-[3px] border-b-0` : tw`border-0 border-b-[3px]`}
`;

export default function CategoryTabItem({ categories, active, setTab }) {
  return (
    <>
      {categories
        ? categories.map((category) => (
            <Li
              className={category.id === active ? 'active' : ''}
              key={category.id}
              onClick={() => setTab(category.id)}
            >
              {category.title}
            </Li>
          ))
        : null}
    </>
  );
}
