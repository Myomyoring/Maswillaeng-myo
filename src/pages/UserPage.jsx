import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
  `}
`;

export default function UserPage() {
  const { nickname } = useParams();
  const { currentUser } = AuthContext();
  const navigate = useNavigate();
  const [member, setMember] = useState({});
  const [tab, setTab] = useState(0);

  useEffect(() => {
    getMember();
  }, [nickname]);

  const getMember = async () => {
    const { data } = await axios.get(`/api/user/nickname?nickname=${nickname}`);
    setMember(data);
    console.log(member);
  };

  // 게시물 탭 토글 - false: 작성한 글, true: 좋아요한 글
  // const [userContent, setUserContent] = useState(false);

  // const contentToggle = () => {
  //   setUserContent(!userContent);
  // };

  // const handlerDelete = async () => {
  //   if (window.confirm('정말 탈퇴하시겠습니까?')) {
  //     try {
  //       const response = await axios.delete(`/api/user/${userId}`);
  //       console.log(response);
  //       // if (response.statusText === 'OK') {
  //       //   navigate(`/signin`, { replace: true });
  //       //   alert('이용해주셔서 감사합니다.');
  //     } catch (err) {
  //       alert('탈퇴를 처리하는 중 문제가 생겼습니다.');
  //       console.log(err);
  //     }
  //   } else {
  //     return;
  //   }
  // };

  return (
    <UserPageStyle>
      <UserProfile member={member} />
      <UserBoardContents active={tab} setTab={setTab} />
    </UserPageStyle>
  );
}
