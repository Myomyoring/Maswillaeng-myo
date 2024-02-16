import DisplayMemberProfile from '../../common/DisplayMemberProfile';
import { DisplayFullDate } from '../../../utils/display_date';

import * as S from '../styles/PostHeader.style';
import EmptyHeartIcon from '../../../statics/svg/empty_heart_icon';
import FullHeartIcon from '../../../statics/svg/full_heart_icon';

export default function PostHeaderPresent({ post, writer, onLike, like }) {
  return (
    <S.PostHeaderStyle>
      <S.CategoryNameBox>
        <S.CategoryLink to={`/`}>{post.category}</S.CategoryLink>
      </S.CategoryNameBox>
      <S.PostTitleBox>
        <S.PostTitleText>{post.title}</S.PostTitleText>
        <S.LikeBox onClick={onLike}>
          {like ? <FullHeartIcon /> : <EmptyHeartIcon />}
          <S.LikeCountText>{post.likeCnt}</S.LikeCountText>
        </S.LikeBox>
      </S.PostTitleBox>
      <S.ProfileBox>
        <DisplayMemberProfile userImage={post.userImage} nickname={writer} />
        <S.DateText>{DisplayFullDate(post.createDate)}</S.DateText>
      </S.ProfileBox>
    </S.PostHeaderStyle>
  );
}
