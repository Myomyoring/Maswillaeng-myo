import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

import { useAuth } from '../context/ProvideAuthContext';
import UserBoardContents from '../components/user/UserBoardContents';
import UserProfile from '../components/user/UserProfile';

import { styled } from 'styled-components';
import tw from 'twin.macro';

const UserPageStyle = styled.div`
  ${tw`
      w-full h-screen
      px-2.5 py-10
      flex justify-center items-center
      overflow-hidden
  `}
`;

export default function UserPage() {
  const { nickname } = useParams();
  const { currentUser } = useAuth();
  const [user, setUser] = useState(false);
  const [visitor, setVisitor] = useState({});
  const [tab, setTab] = useState(0);
  const navigate = useNavigate();

  const [followState, setFollowState] = useState(false);
  const [followerList, setFollowerList] = useState([]);
  const [followingList, setFollowingList] = useState([]);

  useEffect(() => {
    const user = currentUser();
    if (user.nickname === nickname) {
      console.log('user', user);
      setVisitor(user);
      setUser(true);
    } else if (user.nickname !== nickname) {
      getVisitor();
      setUser(false);
    }

    getFollowerList();
    getFollowingList();
  }, [nickname]);

  const getVisitor = async () => {
    try {
      const { data } = await axios.get(`/api/user/nickname?nickname=${nickname}`);
      setVisitor(data);
    } catch (err) {
      if (err.response.status === 500) {
        navigate('404', { replace: true });
      }
    }
  };

  const getFollowerList = async () => {
    const user = currentUser();
    const { data } = await axios.get(`/api/follow/follower/nickname/${nickname}`);
    setFollowerList(data);
    data.find((follower) => follower.nickname === user.nickname) ? setFollowState(true) : setFollowState(false);
  };

  const getFollowingList = async () => {
    const { data } = await axios.get(`/api/follow/following/nickname/${nickname}`);
    setFollowingList(data);
  };

  return (
    <UserPageStyle>
      <UserProfile
        visitor={visitor}
        user={user}
        followerList={followerList}
        followingList={followingList}
        followState={followState}
      />
      <UserBoardContents visitor={visitor} active={tab} setTab={setTab} />
    </UserPageStyle>
  );
}
