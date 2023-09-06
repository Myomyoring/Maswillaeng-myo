import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../auth/ProvideAuthContext';

import { styled } from 'styled-components';
import tw from 'twin.macro';
import EditProfileModal from './EditProfileModal';
import { useEffect, useState } from 'react';

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

const FollowContent = styled.div`
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
  ${(props) => (props.bg === 'gray' ? tw`bg-gray` : tw`bg-point`)}
`;

const Label = styled.label`
  ${tw`
    cursor-pointer
  `}
`;

const UserProfile = ({ visitor, user, followerList, followingList, followState }) => {
  console.log('v', visitor);
  console.log('u', user);
  const navigate = useNavigate();
  const { getUserToken, currentUser } = AuthContext();
  const [modal, setModal] = useState(false);

  // 서버 쪽  로직이 완전하지 않아 에러 발생 함
  /* 서버 문제 : 유저 id를 삭제 할 경우 이를 참조하는 like쪽 테이블에 대한 처리가 되어 있지 않음 */
  const handleDelete = async () => {
    if (window.confirm('정말 탈퇴하시겠습니까?')) {
      try {
        const token = getUserToken();
        if (!token) return;

        const response = await axios.delete(`/api/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response);

        if (response.statusText === 'OK') {
          navigate(`/signin`, { replace: true });
          alert('이용해주셔서 감사합니다.');
        }
      } catch (err) {
        alert('탈퇴를 처리하는 중 문제가 생겼습니다.');
        console.log(err);
      }
    } else {
      return;
    }
  };

  // 팔로우에 변화가 생길 때, 리렌더링
  const onFollow = async ({ target }) => {
    const { innerText } = target;
    console.log(innerText);

    if (innerText === '팔로우') {
      try {
        const token = getUserToken();
        if (!token) return;
        const response = await axios.post(
          `/api/follow/${visitor.nickname}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        navigate(`/user/${visitor.nickname}`, { replace: true });
      } catch (err) {
        return;
      }
    } else if (innerText === '팔로잉') {
      try {
        const token = getUserToken();
        if (!token) return;
        const response = await axios.delete(`/api/follow/${visitor.nickname}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        navigate(`/user/${visitor.nickname}`, { replace: true });
      } catch (err) {
        return;
      }
    } else return;
  };
  return (
    <>
      <ProfileStyle>
        <ProfileImage>
          <img src={user ? visitor.profileImage : visitor.userImage} />
        </ProfileImage>
        <Nickname>{visitor.nickname}</Nickname>
        <FollowContent>
          <Label>
            <span>팔로워</span>
            <span>{visitor.followerCnt === undefined ? '0' : visitor.followerCnt}</span>
          </Label>
          <Label>
            <span>팔로잉</span>
            <span>{visitor.followingCnt === undefined ? '0' : visitor.followingCnt}</span>
          </Label>
        </FollowContent>
        <Introduction>{visitor.introduction}</Introduction>
        {user ? (
          <Buttons>
            <ProfileEditBtn onClick={() => setModal(true)}>프로필 수정</ProfileEditBtn>
            <DeleteUserBtn onClick={handleDelete}>회원 탈퇴</DeleteUserBtn>
          </Buttons>
        ) : (
          <FollowBtn bg={followState ? 'gray' : 'point'} onClick={onFollow}>
            {followState ? '팔로잉' : '팔로우'}
          </FollowBtn>
        )}
      </ProfileStyle>
      {modal ? <EditProfileModal setModal={setModal} user={visitor} /> : null}
    </>
  );
};
export default UserProfile;
