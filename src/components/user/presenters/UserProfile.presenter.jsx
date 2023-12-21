import Modal from '../containers/Modal.container';

import styled from 'styled-components';
import tw from 'twin.macro';

const ProfileStyle = styled.div`
  ${tw`
    w-1/3 h-screen
    m-auto mx-2.5
    text-center
  `}
`;

const ProfileImage = styled.div`
  ${tw`
      w-full h-auto
      flex justify-center
      overflow-hidden
  `}

  img {
    ${tw`
      w-40 h-40
      rounded-full
      outline
      object-cover
    `}
  }
`;

const Nickname = styled.div`
  ${tw`
    p-7
    text-3xl font-bold
  `}
`;

const FollowContents = styled.div`
  ${tw`
  `}
  span {
    ${tw`
      px-5
      font-semibold
    `}
  }
`;

const Introduction = styled.div`
  ${tw`
    p-10
  `}
`;

const Buttons = styled.div`
  ${tw`
  `}
  button {
    ${tw`
      px-5
      text-sm
    `}
  }
`;

const ProfileEditBtn = styled.button`
  ${tw`
    
  `}
`;
const DeleteUserBtn = styled.button`
  ${tw`
    text-darkgray
  `}
`;

const FollowBtn = styled.button`
  ${tw`
      w-1/2 h-10
      my-7
      font-bold text-white text-sm
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
          <img src={member.userImage} />
        </ProfileImage>
        <Nickname>{nickname}</Nickname>
        <FollowContents>
          <button onClick={() => modalHandler(1)}>
            <span>팔로워</span>
            <span>{member.followerCnt ? member.followerCnt : 0}</span>
          </button>
          <button onClick={() => modalHandler(2)}>
            <span>팔로잉</span>
            <span>{member.followingCnt ? member.followingCnt : 0}</span>
          </button>
        </FollowContents>
        <Introduction>{member.introduction}</Introduction>
        {nickname === user.nickname ? (
          <Buttons>
            <ProfileEditBtn onClick={() => modalHandler(0)}>프로필 수정</ProfileEditBtn>
            <DeleteUserBtn onClick={deleteUserHandler}>회원 탈퇴</DeleteUserBtn>
          </Buttons>
        ) : (
          <FollowBtn
            className={followState ? 'following' : ''}
            onClick={() => followHandler(followState ? '팔로잉' : '팔로우')}
          >
            {followState ? '팔로잉' : '팔로우'}
          </FollowBtn>
        )}
      </ProfileStyle>
      {modal ? <Modal member={member} setModal={setModal} modalId={modalId} followerList={followerList} /> : null}
    </>
  );
}
