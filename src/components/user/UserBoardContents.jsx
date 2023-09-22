import { userCategories } from '../../constants';
import UserContents from './UserContents';
import UserTab from '../common/CategoryTab';

import tw from 'twin.macro';
import { styled } from 'styled-components';

const ContentsStyle = styled.div`
  ${tw`
        w-2/3 h-screen
        // mx-2.5
        // flex justify-center items-center
`}
`;

export default function UserBoardContents({ active, setTab, visitor }) {
  return (
    <ContentsStyle>
      <UserTab active={active} categories={userCategories} setTab={setTab} />
      <UserContents active={active} visitor={visitor} />
    </ContentsStyle>
  );
}
