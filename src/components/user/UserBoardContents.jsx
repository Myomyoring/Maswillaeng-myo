import { styled } from 'styled-components';
import UserTab from './UserTab';
import UserContents from './UserContents';
import tw from 'twin.macro';

const ContentsStyle = styled.div`
  ${tw`
        w-2/3 h-full
        mx-2.5
        // flex justify-center items-center
`}
`;

export default function UserBoardContents({ active, setTab }) {
  return (
    <ContentsStyle>
      <UserTab active={active} setTab={setTab} />
      <UserContents active={active} />
    </ContentsStyle>
  );
}
