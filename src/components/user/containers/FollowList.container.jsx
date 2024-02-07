import { useEffect, useState } from 'react';

import FollowListPresenter from '../presenters/FollowList.presenter';
import { userService } from '../../../services/firebaseService/user.firebase.service';

export default function FollowerListContainer({ followerList, followingList, setModal }) {
  const [followList, setFollowList] = useState([]);
  const [modalTitle, setModalTitle] = useState('');

  const setFollowData = async (followUserList) => {
    const list = [];
    for (let userId of followUserList) {
      const response = await userService.getUserById({ userId });
      response.forEach((doc) => {
        const { nickname, userImage } = doc.data();
        list.push({ nickname, userImage });
      });
    }
    setFollowList(list);
  };

  useEffect(() => {
    if (followerList) {
      setFollowData(followerList);
      setModalTitle('팔로워');
    } else if (followingList) {
      setFollowData(followingList);
      setModalTitle('팔로잉');
    }
  }, [setModal]);

  return <FollowListPresenter {...{ followList, modalTitle, setModal }} />;
}
