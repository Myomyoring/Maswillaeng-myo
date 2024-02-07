import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useAuth } from '../../../contexts/ProvideAuthContext';
import UserProfilePresenter from '../presenters/UserProfile.presenter';
import { userService } from '../../../services/firebaseService/user.firebase.service';
import { followService } from '../../../services/firebaseService/follow.firebase.service';
import { CONFIRM_MESSAGE } from '../../../constants';

import FollowContents from '../FollowContents';
import Modal from './Modal.container';
import { useRouter } from '../../../hooks/useRouter';

export default function UserProfileContainer({ modal, setModal }) {
  const { nickname } = useParams();
  const { authRouteTo } = useRouter();
  const { currentUser, logOut } = useAuth();
  const user = currentUser();

  const [member, setMember] = useState({});

  const [modalId, setModalId] = useState(0);
  const modalRef = useRef(null);
  const [followerList, setFollowerList] = useState([]);
  const [followingList, setFollowingList] = useState([]);
  const [followState, setFollowState] = useState(false);

  useEffect(() => {
    if (!nickname) return;
    setMemberData();
  }, [nickname]);

  const setMemberData = async () => {
    const memberData = await getMember();
    if (!memberData) {
      authRouteTo('404');
      return;
    }
    const followerListData = await getFollowerList({ userId: memberData.userId });
    const followingListData = await getFollowingList({ userId: memberData.userId });
    setMember(memberData);
    if (followerListData.length !== 0) {
      setFollowerList(followerListData);
      followerListData.find((follower) => follower === user.userId) ? setFollowState(true) : setFollowState(false);
    }
    if (followingListData.length !== 0) {
      setFollowingList(followingListData);
    }
  };

  const getMember = async () => {
    try {
      const response = await userService.getUserByNickname({ nickname });
      if (!response.empty) {
        let data = {};
        response.forEach((doc) => {
          const { email, followerCnt, followingCnt, introduction, nickname, password, phoneNumber, userId, userImage } =
            doc.data();
          data = { email, followerCnt, followingCnt, introduction, nickname, password, phoneNumber, userId, userImage };
        });
        return data;
      }
    } catch (error) {
      console.log(error.code);
    }
  };

  const getFollowerList = async ({ userId }) => {
    try {
      const data = [];
      const response = await followService.getFollowers({ userId });
      response.forEach((doc) => {
        const { followerUsers } = doc.data();
        data.push(followerUsers);
      });
      return data.flat();
    } catch (error) {
      console.log(error.code);
    }
  };

  const getFollowingList = async ({ userId }) => {
    try {
      const data = [];
      const response = await followService.getFollowings({ userId });
      response.forEach((doc) => {
        const { followingUsers } = doc.data();
        data.push(followingUsers);
      });
      return data.flat();
    } catch (error) {
      console.log(error.code);
    }
  };

  const onDeleteUser = async () => {
    if (window.confirm(CONFIRM_MESSAGE.MEMBER_DELETE_MESSAGE)) {
      try {
        await logOut();
        await userService.deleteAccount();
      } catch (error) {
        alert(CONFIRM_MESSAGE.MEMBER_DELETE_ERROR);
        console.log(error.code);
        return;
      }

      const list = [];
      const writePosts = await getUserWritePost({ userId: user.userId });
      writePosts.forEach((doc) => {
        list.push(doc.id);
      });
      await imageService.deleteImage({ type: 'profile_images', fileName: user.userId });
      for (const postId of list) {
        await postService.deletePost({ postId });
      }
      const commentsData = await commentService.getAllUserComments({ userId: user.userId });
      for (const commentId of commentsData) {
        await commentService.deleteComment({ commentId });
      }
      const repliesData = await commentService.getAllUserReplies({ userId: user.userId });
      for (const commentId of repliesData) {
        await commentService.deleteReply({ commentId });
      }
      await userService.deleteUser({ userId: user.userId });
      // 좋아요도 제거 해야 함
      alert(CONFIRM_MESSAGE.MEMBER_DELETE_SUCCESS_MESSAGE);
    }
  };

  const updateFollowCount = async () => {
    try {
      const followerListData = await getFollowerList({ userId: member.userId });
      const followingListData = await getFollowingList({ userId: user.userId });
      await followService.updateFollowerCount({ memberId: member.userId, count: followerListData.length });
      await followService.updateFollowingCount({ userId: user.userId, count: followingListData.length });
    } catch (error) {
      console.log(error.code);
    }
  };

  const onSaveFollow = async () => {
    try {
      await followService.saveFollower({ memberId: member.userId, userId: user.userId });
      await followService.saveFollowing({ memberId: member.userId, userId: user.userId });
      updateFollowCount();
    } catch (error) {
      console.log(error);
    }
  };

  const onRemoveFollow = async () => {
    try {
      await followService.removeFollower({ memberId: member.userId, userId: user.userId });
      await followService.removeFollowing({ memberId: member.userId, userId: user.userId });
      updateFollowCount();
    } catch (error) {
      console.log(error.code);
    }
  };

  const followHandler = async (state) => {
    if (state === '팔로우') {
      await onSaveFollow();
    } else if (state === '팔로잉') {
      await onRemoveFollow();
    }
  };

  const modalHandler = (id) => {
    setModal(true);
    setModalId(id);
  };

  useEffect(() => {
    modalRef.current?.scrollIntoView();
  }, [modalId]);

  return (
    <>
      <UserProfilePresenter
        {...{
          member,
          nickname,
          user,
          modalHandler,
          onDeleteUser,
          followHandler,
          followState,
        }}
      >
        <FollowContents {...{ member, modalHandler }} />
      </UserProfilePresenter>
      {modal ? <Modal {...{ modalRef, setModal, modalId, followingList, followerList }} /> : null}
    </>
  );
}
