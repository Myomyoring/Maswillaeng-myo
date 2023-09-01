import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../auth/ProvideAuthContext';
import UserProfile from '../components/user/UserProfile';

import { styled } from 'styled-components';
import tw from 'twin.macro';
import UserBoardContents from '../components/user/UserBoardContents';

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
  const { currentUser } = AuthContext();
  const [user, setUser] = useState(false);
  const [visitor, setVisitor] = useState({});
  const [tab, setTab] = useState(0);

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
  }, [nickname]);

  const getVisitor = async () => {
    const { data } = await axios.get(`/api/user/nickname?nickname=${nickname}`);
    console.log('data', data);
    setVisitor(data);
  };

  return (
    <UserPageStyle>
      <UserProfile visitor={visitor} user={user} />
      <UserBoardContents active={tab} setTab={setTab} />
    </UserPageStyle>
  );
}
