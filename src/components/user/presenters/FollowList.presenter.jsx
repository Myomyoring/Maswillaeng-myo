import DisplayMemberProfile from '../../common/DisplayMemberProfile';

import * as S from '../styles/index.js';
import DefaultImage from '../../../statics/images/default_user_image.jpg';

export default function FollowListPresenter({ followList, modalTitle, setModal }) {
  return (
    <S.FollowListStyle>
      {followList.length !== 0 ? (
        followList.map((follow, index) => (
          <span key={index} onClick={() => setModal(false)}>
            <DisplayMemberProfile nickname={follow.nickname} userImage={follow.userImage ?? DefaultImage} />
          </span>
        ))
      ) : (
        <>{`현재 ${modalTitle} 중인 회원이 없습니다.`}</>
      )}
    </S.FollowListStyle>
  );
}
