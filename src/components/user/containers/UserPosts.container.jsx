import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { ETC_MESSAGE } from '../../../constants';
import UserContentsPresenter from '../presenters/UserPosts.presenter';
import { postService } from '../../../services/firebaseService/post.firebase.service';
import { likeService } from '../../../services/firebaseService/like.firebase.service';
import LoadingScreen from '../../common/LoadingScreen';
import Card from '../../common/Card';
import { onSnapshot } from 'firebase/firestore';

export default function UserPostsContainer({ activeTabId, member }) {
  const { nickname } = useParams();
  const [isLoading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [guide, setGuide] = useState('');

  // client limit offset pagination
  const [pagingData, setPagingData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(0);
  const perPage = 8;
  const lastIndex = currentPage * perPage;
  const firstIndex = lastIndex - perPage;
  const hidePrevButton = currentPage < 5;
  const hideNextButton = (currentPage + 1) / 5 < 1;

  const setPostData = (data) => {
    setPagingData(data);
    setLastPage(Math.ceil(data.length / perPage));
    setPosts(data.slice(firstIndex, lastIndex));
  };

  const setUserPost = async (active) => {
    try {
      setLoading(true);
      if (active === 0) {
        await setLikeList(member.userId);
      } else if (active === 1) {
        await setWriteList(member.userId);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const setLikeList = async (memberId) => {
    try {
      if (!memberId) return;
      const list = [];
      const likeQuery = likeService.getUserLikes({ userId: memberId });
      onSnapshot(likeQuery, async (snapshot) => {
        const promises = snapshot.docs.map((doc) => {
          return new Promise((resolve) => {
            const postQuery = postService.getPostQuery({ postId: doc.id });
            onSnapshot(postQuery, (postSnapshot) => {
              const { createDate, likeCnt, thumbnail, title, commentCount } = postSnapshot.data();
              list.push({ id: postSnapshot.id, createDate, likeCnt, thumbnail, title, commentCount, nickname });
              resolve();
            });
          });
        });

        await Promise.all(promises);
        setPostData(list);
        setGuide(ETC_MESSAGE.NOTHING_LIKE_POST);
      });
    } catch (error) {
      console.log(error.code);
    }
  };

  const setWriteList = async (memberId) => {
    try {
      const userWritePostQuery = postService.getUserWritePost({ userId: memberId });
      onSnapshot(userWritePostQuery, (snapshot) => {
        const writeListData = snapshot.docs.map((doc) => {
          const { createDate, likeCnt, thumbnail, title, commentCount } = doc.data();
          return { id: doc.id, createDate, likeCnt, thumbnail, title, nickname, commentCount };
        });
        setPostData(writeListData);
        setGuide(ETC_MESSAGE.BOARD_EMPTY);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const onPageChange = (value) => {
    setCurrentPage(value);
  };

  useEffect(() => {
    if (member) {
      setUserPost(activeTabId);
    }
  }, [activeTabId, member]);

  useEffect(() => {
    setPostData(pagingData);
  }, [pagingData, currentPage]);

  return (
    <UserContentsPresenter
      {...{ isLoading, posts, guide, currentPage, lastPage, hidePrevButton, hideNextButton, onPageChange }}
    >
      {isLoading ? <LoadingScreen /> : <Card {...{ posts, guide }} small={true} />}
    </UserContentsPresenter>
  );
}
