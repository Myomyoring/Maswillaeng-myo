import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useAuth } from '../../../context/ProvideAuthContext';
import UserProfilePresenter from '../presenters/UserProfile.presenter';

export default function UserProfileContainer() {
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
    <UserProfilePresenter
      {...{
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
      }}
    />
  );
}
