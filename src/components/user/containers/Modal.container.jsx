import EditProfileForm from '../containers/EditProfileForm.container';
import FollowList from './FollowList.container';
import ModalPresenter from '../presenters/Modal.presenter';

export default function ModalContainer({ setModal, modalId, followerList }) {
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
  return <ModalPresenter {...{ modalContentsList, modalId, setModal }} />;
}
