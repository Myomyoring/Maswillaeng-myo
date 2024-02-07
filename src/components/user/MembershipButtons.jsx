import * as S from './styles/index';

export default function MembershipButtons({ modalHandler, onDeleteUser }) {
  return (
    <S.MembershipButtonsStyle>
      <S.ProfileButton onClick={() => modalHandler(0)}>프로필 수정</S.ProfileButton>
      <S.ProfileButton onClick={onDeleteUser}>회원 탈퇴</S.ProfileButton>
    </S.MembershipButtonsStyle>
  );
}
