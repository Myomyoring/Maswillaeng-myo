import * as S from './styles/index';

export default function FollowContents({ modalHandler, followerList, followingList }) {
  return (
    <S.FollowContentsStyle>
      <S.ProfileButton onClick={() => modalHandler(1)}>
        <S.FollowText>팔로워</S.FollowText>
        <S.FollowCountText>{followerList.length ?? 0}</S.FollowCountText>
      </S.ProfileButton>
      <S.ProfileButton onClick={() => modalHandler(2)}>
        <S.FollowText>팔로잉</S.FollowText>
        <S.FollowCountText>{followingList.length ?? 0}</S.FollowCountText>
      </S.ProfileButton>
    </S.FollowContentsStyle>
  );
}
