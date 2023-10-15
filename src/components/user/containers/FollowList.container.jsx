import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import FollowListPresenter from '../presenters/FollowList.presenter';

export default function FollowerListContainer({ followerList, setModal }) {
  const { nickname } = useParams();
  const [followList, setFollowList] = useState([]);
  const [guide, setGuide] = useState('');

  const getFollowingList = async () => {
    try {
      const { data } = await followService.getFollowing({ nickname });
      setFollowList(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (followerList) {
      setFollowList(followerList);
      setGuide('팔로워');
    } else if (!followerList) {
      getFollowingList();
      setGuide('팔로잉');
    }
  }, [setModal]);

  return <FollowListPresenter {...{ followList, guide, setModal }} />;
}
