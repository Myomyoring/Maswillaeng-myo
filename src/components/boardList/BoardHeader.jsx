import { Link } from 'react-router-dom';

import { styled } from 'styled-components';
import tw from 'twin.macro';
import WriteIcon from '../../statics/svg/write_icon';
import LinkButton from '../common/LinkButton';

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
      <LinkButton to={`boardWrite`}>
        <span>
          <WriteIcon /> 글쓰기
        </span>
      </LinkButton>
    </BoardHeaderStyle>
  );
}
