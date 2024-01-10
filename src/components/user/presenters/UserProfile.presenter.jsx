import Modal from '../containers/Modal.container';

import styled from 'styled-components';
import tw from 'twin.macro';

const ProfileStyle = styled.div`
  ${tw`
      flex flex-col gap-8 items-center

      desktop:mt-20
    `}
`;

const ProfileImage = styled.div`
  ${tw``}
`;

const Image = styled.img`
  ${tw`
      w-40 h-40
      rounded-full
      outline
      object-cover
    `}
`;

const NicknameBox = styled.div`
  ${tw`
      text-3xl font-bold
  `}
`;

const FollowContents = styled.div`
  ${tw`
      flex justify-center gap-4
  `}
`;

const Button = styled.button`
  ${tw``}
`;

const FollowText = styled.span`
  ${tw`
      font-semibold text-lg
  `}
`;

const FollowCountText = styled.span`
  ${tw`
      pl-6 text-lg
  `}
`;

const IntroductionBox = styled.div`
  ${tw`text-lg`}
`;

const ButtonBox = styled.div`
  ${tw`
      flex flex-col gap-4
    `}

  button {
    ${tw`
        text-md font-semibold text-darkgray
    `}
  }
`;

const FollowButton = styled.button`
  ${tw`
      w-[260px] h-10
      font-bold text-white text-sm
      rounded-md
      cursor-pointer
  `}
  ${(props) => (props.className ? tw`bg-gray` : tw`bg-point`)}
`;

export default function UserProfilePresenter({
  member,
  nickname,
  user,
  modalHandler,
  deleteUserHandler,
  followHandler,
  followState,
  modal,
  setModal,
  modalId,
  followerList,
}) {
  return (
    <>
      <ProfileStyle>
        <ProfileImage>
          <Image src={member.userImage} />
        </ProfileImage>
        <NicknameBox>{nickname}</NicknameBox>
        <FollowContents>
          <Button onClick={() => modalHandler(1)}>
            <FollowText>팔로워</FollowText>
            <FollowCountText>{member.followerCnt ? member.followerCnt : 0}</FollowCountText>
          </Button>
          <Button onClick={() => modalHandler(2)}>
            <FollowText>팔로잉</FollowText>
            <FollowCountText>{member.followingCnt ? member.followingCnt : 0}</FollowCountText>
          </Button>
        </FollowContents>
        <IntroductionBox>{member.introduction}</IntroductionBox>
        {nickname === user.nickname ? (
          <ButtonBox>
            <Button onClick={() => modalHandler(0)}>프로필 수정</Button>
            <Button onClick={deleteUserHandler}>회원 탈퇴</Button>
          </ButtonBox>
        ) : (
          <FollowButton
            className={followState ? 'following' : ''}
            onClick={() => followHandler(followState ? '팔로잉' : '팔로우')}
          >
            {followState ? '팔로잉' : '팔로우'}
          </FollowButton>
        )}
      </ProfileStyle>
      {modal ? <Modal member={member} setModal={setModal} modalId={modalId} followerList={followerList} /> : null}
    </>
  );
}
