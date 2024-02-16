import FollowButton from '../FollowButton';
import MembershipButtons from '../MembershipButtons';

import * as S from '../styles/index';
import DefaultImage from '../../../statics/images/default_user_image.jpg';

export default function UserProfilePresenter({
  member,
  nickname,
  user,
  modalHandler,
  onDeleteConfirm,
  followHandler,
  followState,
  children,
}) {
  return (
    <S.UserProfileStyle>
      <S.ProfileImage>
        <S.Image src={member.userImage ?? DefaultImage} />
      </S.ProfileImage>
      <S.NicknameBox>{nickname}</S.NicknameBox>
      {children}
      <S.IntroductionBox>{member.introduction}</S.IntroductionBox>
      {nickname === user.nickname ? (
        <MembershipButtons {...{ modalHandler, onDeleteConfirm }} />
      ) : (
        <FollowButton {...{ followState, followHandler }} />
      )}
    </S.UserProfileStyle>
  );
}
