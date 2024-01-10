import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { USER_LIKE_GUIDE, USER_WRITE_GUIDE } from '../../../constants';
import UserContentsPresenter from '../presenters/UserPosts.presenter';
import { postService } from '../../../services/firebaseService/post.firebase.service';
import { likeService } from '../../../services/firebaseService/like.firebase.service';
import { userService } from '../../../services/firebaseService/user.firebase.service';

export default function UserPostsContainer({ active }) {
  const { nickname } = useParams();
  const [member, setMember] = useState({});
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [guide, setGuide] = useState('');

  useEffect(() => {
    getMember();
    if (active === 0) {
      getLikeList();
      setGuide(USER_LIKE_GUIDE);
    } else if (active === 1) {
      getWriteList();
      setGuide(USER_WRITE_GUIDE);
    }
  }, [active]);

  const getMember = async () => {
    const snap = await userService.getUserByNickname({ nickname });
    snap.forEach((doc) => {
      setMember(doc.data());
    });
  };

  const getLikeList = async () => {
    let ids = [];
    try {
      const likePostsSnap = await likeService.getUserLikes({ userId: member.id });
      likePostsSnap.forEach((doc) => {
        ids.push(doc.id);
      });
      await getPost(ids);
    } catch (error) {
      console.log(error.code);
    }
  };

  const getPost = async (idList) => {
    let list = [];
    for (let postId of idList) {
      const response = await postService.getPost({ postId });
      list.push(response.data());
    }
    setPosts(list);
  };

  const getWriteList = async () => {
    try {
      let list = [];
      const response = await postService.getUserWritePost({ userId: member.id });
      response.forEach((doc) => {
        list.push(doc.data());
      });
      setPosts(list);
    } catch (error) {
      console.log(error.code);
    }
  };

  return <UserContentsPresenter {...{ posts, guide }} />;
}
