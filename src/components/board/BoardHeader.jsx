import BoardWriteButton from '../common/LinkButton';

import { styled } from 'styled-components';
import tw from 'twin.macro';
import WriteIcon from '../../statics/svg/write_icon';

const BoardHeaderStyle = styled.header`
  ${tw`
        w-full h-16
        flex justify-end items-center
    `}

  span {
    ${tw`
        flex items-center
      text-white
    `}
  }

  svg {
    ${tw`
      fill-white
    `}
  }
`;

export default function BoardHeader() {
  return (
    <BoardHeaderStyle>
      <BoardWriteButton to={`/boardWrite`}>
        <span>
          <WriteIcon /> 글쓰기
        </span>
      </BoardWriteButton>
    </BoardHeaderStyle>
  );
}
