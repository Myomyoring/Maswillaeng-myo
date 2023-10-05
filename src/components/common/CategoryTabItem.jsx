import { styled } from 'styled-components';
import tw from 'twin.macro';

const Li = styled.li`
  ${tw`
        w-1/4
        p-5
        text-center
        cursor-pointer
        border-point
        border-solid
    `}
  ${(props) =>
    props.className === 'active' ? tw`font-bold border-x-2 border-t-2 border-b-0 rounded-md` : tw`border-0 border-b-2`}
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
