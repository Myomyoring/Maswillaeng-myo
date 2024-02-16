import { useEffect, useState } from 'react';
import UserBoardContents from '../components/user/UserBoardContents';
import UserProfile from '../components/user/containers/UserProfile.container';

import * as S from './styles/User.style';
import { useParams } from 'react-router-dom';
import { userService } from '../services/firebaseService/user.firebase.service';
import { onSnapshot } from 'firebase/firestore';
import { useRouter } from '../hooks/useRouter';

export default function UserPage() {
  const { nickname } = useParams();
  const { authRouteTo } = useRouter();
  const [member, setMember] = useState({});
  const [modal, setModal] = useState(false);

  const getMember = async () => {
    try {
      const userQuery = userService.getUserByNickname({ nickname });
      onSnapshot(userQuery, (snapshot) => {
        if (snapshot.empty) {
          authRouteTo('/404');
          return;
        }
        snapshot.docs.map((doc) => {
          const { email, followerCnt, followingCnt, introduction, nickname, phoneNumber, userId, userImage } =
            doc.data();
          setMember({
            email,
            followerCnt,
            followingCnt,
            introduction,
            nickname,
            phoneNumber,
            userId,
            userImage,
          });
        });
      });
    } catch (error) {
      console.log(error.code);
    }
  };

  useEffect(() => {
    getMember();
  }, [nickname]);
  return (
    <>
      <S.UserPageStyle>
        <UserProfile {...{ modal, setModal, member }} />
        {!modal ? <UserBoardContents {...{ member }} /> : null}
      </S.UserPageStyle>
    </>
  );
}
