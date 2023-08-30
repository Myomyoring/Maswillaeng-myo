import { styled } from 'styled-components';
import tw from 'twin.macro';

const ProfileStyle = styled.div`
  ${tw`
    w-1/3 h-full
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
  bg-point
    font-bold text-white text-sm
    cursor-pointer
  `}
`;

const UserProfile = ({ member }) => {
  return (
    <ProfileStyle>
      <ProfileImage>
        <img src={member.userImage} />
      </ProfileImage>
      <Nickname>{member.nickname}</Nickname>
      <FollowContent>
        <span>팔로워</span>
        <span>{member.followerCnt === undefined ? '0' : member.followerCnt}</span>
        <span>팔로잉</span>
        <span>{member.followingCnt === undefined ? '0' : member.followingCnt}</span>
      </FollowContent>
      <Introduction>{member.introduction}zzzzzzzzzzzzzzzzzzzzzzzzzzzzzz</Introduction>
      <Buttons>
        <ProfileEditBtn>프로필 수정</ProfileEditBtn>
        <DeleteUserBtn>회원 탈퇴</DeleteUserBtn>
      </Buttons>
      <FollowBtn>팔로우</FollowBtn>
    </ProfileStyle>
  );
};
export default UserProfile;
