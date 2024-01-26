import BoardWriteButton from '../common/LinkButton';

import * as S from './style/BoardHeader.style';
import WriteIcon from '../../statics/svg/write_icon';

export default function BoardHeader() {
  return (
    <S.BoardHeaderStyle>
      <BoardWriteButton to={`/boardWrite`}>
        <WriteIcon /> 글쓰기
      </BoardWriteButton>
    </S.BoardHeaderStyle>
  );
}
