import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import UserProfile from '../components/user/UserProfile';
import UserWriteContents from '../components/user/UserWriteContents';

export default function UserPage() {
  const { nickname } = useParams();
  const [member, setMember] = useState({});
  useEffect(() => {
    getMember();
  }, [nickname]);

  // 게시물 탭 토글 - false: 작성한 글, true: 좋아요한 글
  const [userContent, setUserContent] = useState(false);
  const contentToggle = () => {
    setUserContent(!userContent);
  };
  const getMember = async () => {
    const { data } = await axios.get(`/api/user/nickname?nickname=${nickname}`);
    setMember(data);
  };

  const handlerDelete = async () => {
    let confirm = window.confirm('정말 탈퇴하시겠습니까?');

    if (confirm === true) {
      await axios
        .delete(`/api/user`)
        .then((res) => {
          if (res.status === 200) {
            axios.post(`/api/auth/logout`, {});
            alert('이용해주셔서 감사합니다.');
          } else {
            alert('탈퇴를 처리하는 중 문제가 생겼습니다.');
            return;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (confirm === false) {
      return;
    }
  };

  return (
    <>
      <div>
        <UserProfile visitUser={nickname} member={member} />
        <div>
          {/* 토글 */}
          <div>
            <div>
              <span>작성한 글</span>
            </div>
            {/*<div*/}
            {/*    className={userContent ? "font-bold w-1/2 mx-3 border-b-2 border-b-[#EA4E4E]" : "w-1/2 mx-3"}>*/}
            {/*    <button onClick={contentToggle}>*/}
            {/*        좋아요한 글*/}
            {/*    </button>*/}
            {/*</div>*/}
          </div>
          {/* 글 */}
          <div>
            {/* 작성한 글 */}
            {!userContent && <UserWriteContents nickname={nickname} />}
            {/* 좋아요한 글 */}
            {/*{userContent && <UserLikeContents nickname={ nickname } token={ token } />*/}
            {/*}*/}
          </div>
        </div>
      </div>
      <button onClick={handlerDelete}>회원탈퇴</button>
    </>
  );
}
