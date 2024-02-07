import * as S from './styles/index';

export default function FollowButton({ followState, followHandler }) {
  return (
    <S.FollowButtonStyle
      className={followState ? 'following' : ''}
      onClick={() => followHandler(followState ? '팔로잉' : '팔로우')}
    >
      {followState ? '팔로잉' : '팔로우'}
    </S.FollowButtonStyle>
  );
}
