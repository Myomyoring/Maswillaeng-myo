import * as S from './styles/index';

export default function FollowContents({ member, modalHandler }) {
  return (
    <S.FollowContentsStyle>
      <S.ProfileButton onClick={() => modalHandler(1)}>
        <S.FollowText>팔로워</S.FollowText>
        <S.FollowCountText>{member.followerCnt ?? 0}</S.FollowCountText>
      </S.ProfileButton>
      <S.ProfileButton onClick={() => modalHandler(2)}>
        <S.FollowText>팔로잉</S.FollowText>
        <S.FollowCountText>{member.followingCnt ?? 0}</S.FollowCountText>
      </S.ProfileButton>
    </S.FollowContentsStyle>
  );
}
