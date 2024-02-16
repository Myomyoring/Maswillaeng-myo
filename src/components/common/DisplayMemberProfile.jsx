import * as S from './styles/DisplayMemberProfile.style';

export default function DisplayMemberProfile({ userImage, nickname }) {
  return (
    <S.DisplayMemberProfileStyle>
      <S.UserPageLink to={`/user/${nickname}`}>
        <S.UserImage src={userImage} />
        <S.UserNickNameText>{nickname}</S.UserNickNameText>
      </S.UserPageLink>
    </S.DisplayMemberProfileStyle>
  );
}
