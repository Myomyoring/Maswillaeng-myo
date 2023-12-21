import { useEffect, useState } from 'react';

import FollowListPresenter from '../presenters/FollowList.presenter';
import { followService } from '../../../services/firebaseService/follow.firebase.service';
import { userService } from '../../../services/firebaseService/user.firebase.service';

export default function FollowerListContainer({ member, followerList, setModal }) {
  const [followList, setFollowList] = useState([]);
  const [guide, setGuide] = useState('');

  const getFollowingList = async () => {
    try {
      const response = await followService.getFollowings({ userId: member.id });
      response.forEach((doc) => {
        let data = doc.data();
        getUserData(data.followingUsers);
      });
    } catch (error) {
      console.log(error.code);
    }
  };

  const getUserData = async (userList) => {
    let list = [];
    for (let userId of userList) {
      const response = await userService.getUserById({ userId });
      response.forEach((doc) => {
        let data = doc.data();
        list.push({
          nickname: data.nickname,
          userImage: data.userImage,
        });
      });
    }
    setFollowList(list);
  };

  useEffect(() => {
    if (followerList) {
      getUserData(followerList);
      setGuide('팔로워');
    } else if (!followerList) {
      getFollowingList();
      setGuide('팔로잉');
    }
  }, [setModal]);

  return <FollowListPresenter {...{ followList, guide, setModal }} />;
}
