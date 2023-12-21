import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useAuth } from '../../../context/ProvideAuthContext';
import UserProfilePresenter from '../presenters/UserProfile.presenter';
import { userService } from '../../../services/firebaseService/user.firebase.service';
import { followService } from '../../../services/firebaseService/follow.firebase.service';

export default function UserProfileContainer() {
  const { nickname } = useParams();
  const { currentUser, logOut } = useAuth();
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
      const memberSnap = await userService.getUserByNickname({ nickname });
      if (!memberSnap.empty) {
        memberSnap.forEach((doc) => setMember(doc.data()));
      }
    } catch (error) {
      console.log(error.code);
    }
  };

  // invalid-argument -> member 굴러가는 중
  const getFollowerList = async () => {
    try {
      const followerSnap = await followService.getFollowers({ userId: member.id });
      followerSnap.forEach((doc) => {
        let data = doc.data();
        data.followerUsers.find((follower) => follower === user.id) ? setFollowState(true) : setFollowState(false);
        setFollowerList(data.followerUsers);
      });
    } catch (error) {
      console.log(error.code);
    }
  };

  const deleteUserHandler = async () => {
    if (window.confirm('정말 탈퇴하시겠습니까?')) {
      try {
        await userService.deleteAccount();
      } catch (error) {
        alert('탈퇴를 처리하는 중 문제가 생겼습니다.');
        console.log(error.code);
        return;
      }
      await userService.deleteUser({ userId: user.id });
      await logOut();
      alert('이용해주셔서 감사합니다.');
    } else {
      return;
    }
  };

  const followHandler = async (reqType) => {
    if (reqType === '팔로우') {
      await saveFollow();
    } else if (reqType === '팔로잉') {
      await removeFollow();
    }
  };

  const saveFollow = async () => {
    await getFollowerList();
    try {
      await followService.saveFollower({ memberId: member.id, userId: user.id });
    } catch (error) {
      console.log(error.code);
      switch (error.code) {
        case 'not-found':
          await followService.createFollowerDoc({ memberId: member.id });
          saveFollow();
          return;
      }
    }
    try {
      await followService.saveFollowing({ memberId: member.id, userId: user.id });
    } catch (error) {
      console.log(error.code);
      switch (error.code) {
        case 'not-found':
          await followService.createFollowingDoc({ userId: user.id });
          saveFollow();
          return;
      }
    }
    try {
      await followService.updateFollowerAddCount({ memberId: member.id, count: followerList.length });
      const followingSnap = await followService.getFollowings({ userId: user.id });
      followingSnap.forEach((doc) => {
        let data = doc.data();
        console.log(data.followingUsers);
        followService.updateFollowingAddCount({ userId: user.id, count: data.followingUsers.length });
      });
      await getMember();
      await getFollowerList();
    } catch (error) {
      console.log(error.code);
    }
  };

  const removeFollow = async () => {
    await getMember();
    try {
      await followService.removeFollower({ memberId: member.id, userId: user.id });
      await followService.removeFollowing({ memberId: member.id, userId: user.id });
      await followService.updateFollowerDeleteCount({ memberId: member.id, count: followerList.length });
      const followingSnap = await followService.getFollowings({ userId: user.id });
      followingSnap.forEach((doc) => {
        let data = doc.data();
        followService.updateFollowingDeleteCount({ userId: user.id, count: data.followingUsers.length });
      });

      await getMember();
      await getFollowerList();
    } catch (error) {
      console.log(error.code);
      return;
    }
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
