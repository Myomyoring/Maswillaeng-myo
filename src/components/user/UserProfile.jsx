import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { followService } from '../../services/follow.service';
import { useAuth } from '../../context/ProvideAuthContext';
import { userService } from '../../services/user.service';
import Modal from './Modal';

import { styled } from 'styled-components';
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

export default function UserProfile() {
  const { nickname } = useParams();
  const navigate = useNavigate();
  const { getUserToken, currentUser, logOut } = useAuth();
  const token = getUserToken();
  const user = currentUser();
  const [member, setMember] = useState({});
  const [modal, setModal] = useState(false);
  const [modalId, setModalId] = useState(0);
  const [followerList, setFollowerList] = useState([]);
  const [followState, setFollowState] = useState(false);

  useEffect(() => {
    getMember();
    getFollowerList();
  }, [nickname]);

  const getMember = async () => {
    try {
      const { data } = await userService.getUserByNickname({ nickname });
      setMember(data);
    } catch (error) {
      if (error.response.status === 500) {
        navigate('500', { replace: true });
      } else console.log(error.message);
    }
  };
  const getFollowerList = async () => {
    try {
      const { data } = await followService.getFollower({ nickname });
      setFollowerList(data);
      data.find((follower) => follower.nickname === user.nickname) ? setFollowState(true) : setFollowState(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  /* 탈퇴 할 사용자가 작성한 게시물이 있을 시, 탈퇴되지 않음 */
  const deleteUserHandler = async () => {
    if (window.confirm('정말 탈퇴하시겠습니까?')) {
      try {
        if (!token) return;
        const response = await userService.deleteUser({ token });
        if (response.statusText === 'OK') {
          logOut();
          alert('이용해주셔서 감사합니다.');
        }
      } catch (error) {
        alert('탈퇴를 처리하는 중 문제가 생겼습니다.');
        console.log(error);
      }
    } else {
      return;
    }
  };

  const followHandler = async ({ target }) => {
    const { innerText } = target;

    if (innerText === '팔로우') {
      try {
        if (!token) return;
        const response = await followService.saveFollow({ nickname, token });
        if (response.statusText === 'OK') {
          getMember();
          getFollowerList();
        }
      } catch (error) {
        console.log(error.message);
        return;
      }
    } else if (innerText === '팔로잉') {
      try {
        if (!token) return;
        const response = await followService.deleteFollow({ nickname, token });
        if (response.statusText === 'OK') {
          getMember();
          getFollowerList();
        }
      } catch (error) {
        console.log(error.message);
        return;
      }
    } else return;
  };

  const modalHandler = async (id) => {
    setModal(true);
    setModalId(id);
  };

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
          <FollowBtn className={followState ? 'following' : ''} onClick={followHandler}>
            {followState ? '팔로잉' : '팔로우'}
          </FollowBtn>
        )}
      </ProfileStyle>
      {modal ? <Modal setModal={setModal} modalId={modalId} followerList={followerList} /> : null}
    </>
  );
}
