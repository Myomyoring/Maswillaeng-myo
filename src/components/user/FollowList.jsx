import { useParams } from 'react-router-dom';
import DisplayMemberProfile from '../common/DisplayMemberProfile';

import styled from 'styled-components';
import tw from 'twin.macro';
import { useEffect, useState } from 'react';
import { followService } from '../../services/follow.service';

const FollowerUsers = styled.div`
  ${tw`
      h-auto max-h-[500px]
      p-5
      text-xs
      border-solid
      overflow-scroll
      grid grid-cols-3
    `}
  span {
    ${tw`m-1`}
  }
`;

export default function FollowerList({ followerList, setModal }) {
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

  return (
    <FollowerUsers>
      {followList.length !== 0 ? (
        followList.map((follow, index) => (
          <span key={index} onClick={() => setModal(false)}>
            <DisplayMemberProfile nickname={follow.nickname} userImage={follow.userImage} />
          </span>
        ))
      ) : (
        <>{`현재 ${guide} 중인 회원이 없습니다.`}</>
      )}
    </FollowerUsers>
  );
}
