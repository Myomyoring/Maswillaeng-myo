import styled from 'styled-components';
import tw from 'twin.macro';
import DisplayMemberProfile from '../../common/DisplayMemberProfile';

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

export default function FollowListPresenter({ followList, guide, setModal }) {
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
