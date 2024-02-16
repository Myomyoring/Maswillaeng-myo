import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { onSnapshot } from 'firebase/firestore';

import { commentService } from '../../../services/firebaseService/comment.firebase.service';
import { CONFIRM_MESSAGE } from '../../../constants';
import { followService } from '../../../services/firebaseService/follow.firebase.service';
import { imageService } from '../../../services/firebaseService/image.firebase.service';
import { likeService } from '../../../services/firebaseService/like.firebase.service';
import { postService } from '../../../services/firebaseService/post.firebase.service';
import { useAuth } from '../../../contexts/ProvideAuthContext';
import { userService } from '../../../services/firebaseService/user.firebase.service';
import UserProfilePresenter from '../presenters/UserProfile.presenter';

import FollowContents from '../FollowContents';
import Modal from './Modal.container';

export default function UserProfileContainer({ modal, setModal, member }) {
  const { nickname } = useParams();
  const { currentUser, logOut, userCredential } = useAuth();
  const user = currentUser();

  const modalRef = useRef(null);
  const [modalId, setModalId] = useState(0);
  const [followerList, setFollowerList] = useState([]);
  const [followingList, setFollowingList] = useState([]);
  const [followState, setFollowState] = useState(false);

  const [passwordConfirm, setPasswordConfirm] = useState('');

  useEffect(() => {
    if (!member) return;
    setMemberData();
  }, [member]);

  const setMemberData = async () => {
    await setFollowerData({ userId: member.userId });
    await setFollowingData({ userId: member.userId });
  };

  const setFollowerData = async ({ userId }) => {
    try {
      const data = [];
      const response = await followService.getFollowers({ userId });
      response.forEach((doc) => {
        const { followerUsers } = doc.data();
        if (followerUsers.some((follower) => follower === user.userId)) setFollowState(true);
        data.push(followerUsers);
      });
      setFollowerList(data.flat());
    } catch (error) {
      console.log(error.code);
    }
  };

  const setFollowingData = async ({ userId }) => {
    try {
      const data = [];
      const response = await followService.getFollowings({ userId });
      response.forEach((doc) => {
        const { followingUsers } = doc.data();
        data.push(followingUsers);
      });
      setFollowingList(data.flat());
    } catch (error) {
      console.log(error.code);
    }
  };

  const onDeleteUser = async () => {
    try {
      await deleteUserProfileImage();
      deleteUserPost();
      deleteUserLike();
      await deleteUserComment();
      await deleteUserFollow();
      await userService.deleteAccount();
      await userService.deleteUser({ userId: user.userId });
      await logOut();
      alert(CONFIRM_MESSAGE.MEMBER_DELETE_SUCCESS_MESSAGE);
    } catch (error) {
      alert(CONFIRM_MESSAGE.MEMBER_DELETE_ERROR);
      console.log(error.code);
    }
  };

  const onChange = (event) => {
    const { value } = event.target;
    setPasswordConfirm(value);
  };

  const onDeleteConfirm = () => {
    if (window.confirm(CONFIRM_MESSAGE.MEMBER_DELETE_MESSAGE)) {
      modalHandler(3);
    }
  };

  const userPasswordConfirm = async () => {
    try {
      setModal(false);
      const result = await userCredential(passwordConfirm);
      if (!result) {
        alert(CONFIRM_MESSAGE.PASSWORD_CONFIRM_ERROR);
        return;
      }
      await onDeleteUser();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUserProfileImage = async () => {
    try {
      await imageService.deleteImage({ type: 'profile_images', fileName: user.userId });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUserFollow = async () => {
    try {
      await followService.deleteAllFollowing({ userId: user.userId });
      await followService.deleteAllFollower({ userId: user.userId });

      for (let id of followerList) {
        await followService.removeFollowing({ memberId: user.userId, userId: id });
      }
      for (let id of followingList) {
        await followService.removeFollower({ memberId: id, userId: user.userId });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUserComment = async () => {
    try {
      const commentsQuery = commentService.getAllUserComments({ userId: user.userId });
      onSnapshot(commentsQuery, (snapshot) => {
        snapshot.docs.map((doc) => {
          const { postId } = doc.data();
          commentService.deleteComment({ commentId: doc.id });
          const commentsQuery = commentService.getComments({ postId });
          const repliesQuery = commentService.getReplies({ postId });
          onSnapshot(commentsQuery, (commentSnapshot) => {
            onSnapshot(repliesQuery, (replySnapshot) => {
              commentService.updateCommentCount({
                postId,
                commentCount: commentSnapshot.docs.length + replySnapshot.docs.length,
              });
            });
          });
        });
      });
      const repliesQuery = commentService.getAllUserReplies({ userId: user.userId });
      onSnapshot(repliesQuery, (snapshot) => {
        snapshot.docs.map((doc) => {
          const { postId } = doc.data();
          commentService.deleteReply({ commentId: doc.id });
          const commentsQuery = commentService.getComments({ postId });
          const repliesQuery = commentService.getReplies({ postId });
          onSnapshot(commentsQuery, (commentSnapshot) => {
            onSnapshot(repliesQuery, (replySnapshot) => {
              commentService.updateCommentCount({
                postId,
                commentCount: commentSnapshot.docs.length + replySnapshot.docs.length,
              });
            });
          });
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUserPost = () => {
    try {
      const writePostQuery = postService.getUserWritePost({ userId: user.userId });
      onSnapshot(writePostQuery, (snapshot) => {
        snapshot.docs.map((doc) => {
          postService.deletePost({ postId: doc.id });
          imageService.deleteImage({ type: 'post_images', fileName: doc.id });
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUserLike = () => {
    try {
      const likesQuery = likeService.getUserLikes({ userId: user.userId });
      onSnapshot(likesQuery, (snapshot) => {
        snapshot.docs.map((doc) => {
          const { likeUsers } = doc.data();
          likeService.deleteLike({ postId: doc.id, userId: user.userId });
          likeService.updateLike({ postId: doc.id, likeCnt: likeUsers.length - 1 });
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  const updateFollowCount = async () => {
    try {
      if (followState) {
        await followService.updateFollowerCount({ memberId: member.userId, count: followerList.length - 1 });
        await followService.updateFollowingCount({ userId: user.userId, count: followingList.length - 1 });
      } else {
        await followService.updateFollowerCount({ memberId: member.userId, count: followerList.length + 1 });
        await followService.updateFollowingCount({ userId: user.userId, count: followingList.length + 1 });
      }
    } catch (error) {
      console.log(error.code);
    }
  };

  const onSaveFollow = async () => {
    try {
      await followService.saveFollower({ memberId: member.userId, userId: user.userId });
      await followService.saveFollowing({ memberId: member.userId, userId: user.userId });
      updateFollowCount();
      setFollowState(true);
    } catch (error) {
      console.log(error);
    }
  };

  const onRemoveFollow = async () => {
    try {
      await followService.removeFollower({ memberId: member.userId, userId: user.userId });
      await followService.removeFollowing({ memberId: member.userId, userId: user.userId });
      updateFollowCount();
      setFollowState(false);
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
          onDeleteConfirm,
          followHandler,
          followState,
        }}
      >
        <FollowContents {...{ modalHandler, followerList, followingList }} />
      </UserProfilePresenter>
      {modal ? (
        <Modal
          {...{
            modalRef,
            setModal,
            modalId,
            followingList,
            followerList,
            passwordConfirm,
            onChange,
            userPasswordConfirm,
          }}
        />
      ) : null}
    </>
  );
}
