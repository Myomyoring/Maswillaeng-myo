import EditProfileForm from './EditProfileForm';
import FollowList from './FollowList';

import { styled } from 'styled-components';
import tw from 'twin.macro';

const ModalStyle = styled.div`
  ${tw`
        w-full h-screen
        absolute
        flex justify-center items-center
        bg-darkgray bg-opacity-70
        text-sm
    `}
`;

const Container = styled.div`
  ${tw`
        w-1/2
        bg-main
    `}
`;

const Cap = styled.div`
  ${tw`
        flex
        justify-between items-center
        border-solid border-t-4
        
    `}
`;

const Title = styled.span`
  ${tw`
    mx-5
    `}
`;

const CloseButton = styled.button`
  ${tw`
        w-10 h-10
    `}
`;

export default function Modal({ setModal, modalId, followerList }) {
  const modalContentsList = [
    { id: 0, title: '프로필 수정', view: <EditProfileForm setModal={setModal} /> },
    {
      id: 1,
      title: '팔로워 목록',
      view: <FollowList followerList={followerList} setModal={setModal} />,
    },
    {
      id: 2,
      title: '팔로잉 목록',
      view: <FollowList setModal={setModal} />,
    },
  ];
  return (
    <ModalStyle>
      <Container>
        {modalContentsList.map((content) =>
          content.id === modalId ? (
            <div key={content.id}>
              <Cap>
                <Title>{content.title}</Title>
                <CloseButton onClick={() => setModal(false)}>X</CloseButton>
              </Cap>
              {content.view}
            </div>
          ) : null,
        )}
      </Container>
    </ModalStyle>
  );
}
