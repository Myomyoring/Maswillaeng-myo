import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { USER_LIKE_GUIDE, USER_WRITE_GUIDE } from '../../../constants';
import UserContentsPresenter from '../presenters/UserContents.presenter';

export default function UserContentsContainer({ active }) {
  const { nickname } = useParams();
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [guide, setGuide] = useState('');

  useEffect(() => {
    if (active === 0) {
      getLikeList();
      setGuide(USER_LIKE_GUIDE);
    } else if (active === 1) {
      getWriteList();
      setGuide(USER_WRITE_GUIDE);
    }
  }, [active]);

  const getLikeList = async () => {
    setPosts([]);
  };

  const getWriteList = async () => {
    try {
      if (!token) return;
      const response = await postService.getUserWritePost({ nickname, page, token });
      console.log(response);
      setPosts(response.data.content);
    } catch (error) {
      console.log(error.message);
    }
  };

  return <UserContentsPresenter {...{ posts, guide }} />;
}
