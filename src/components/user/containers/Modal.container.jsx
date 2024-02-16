import EditProfileForm from '../containers/EditProfileForm.container';
import FollowList from './FollowList.container';
import ModalPresenter from '../presenters/Modal.presenter';
import PasswordConfirmView from '../PasswordConfirmView';

export default function ModalContainer({
  modalRef,
  setModal,
  modalId,
  followingList,
  followerList,
  passwordConfirm,
  onChange,
  userPasswordConfirm,
}) {
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
      view: <FollowList followingList={followingList} setModal={setModal} />,
    },
    {
      id: 3,
      title: '비밀번호를 다시 한번 입력해주세요.',
      view: (
        <PasswordConfirmView
          passwordConfirm={passwordConfirm}
          onChange={onChange}
          userPasswordConfirm={userPasswordConfirm}
        />
      ),
    },
  ];
  return <ModalPresenter {...{ modalContentsList, modalRef, modalId, setModal }} />;
}
