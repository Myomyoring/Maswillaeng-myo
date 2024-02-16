import { DisplayPostDate } from '../../utils/display_date';
import { ETC_MESSAGE } from '../../constants';

import * as S from './styles/Card.style';
import DefaultThumbnail from '../../statics/images/default_thumbnail.png';
import LikeIcon from '../../statics/svg/small_full_heart_icon';

export default function Card({ posts, guide, small }) {
  return (
    <S.CardStyle>
      <S.CardLayout className={small ? 'small' : ''}>
        {posts?.length !== 0 ? (
          posts?.map((post, index) => (
            <S.CardContents key={index}>
              <S.TitleLink to={`/board/${post.id}/${post.nickname}`}>
                <S.Thumbnail src={post.thumbnail ? post.thumbnail : DefaultThumbnail} />
                <S.Title>{post.title}</S.Title>
                <S.CommentCount>[ {post.commentCount} ]</S.CommentCount>
              </S.TitleLink>
              <S.Footer>
                <S.Nickname to={`/user/${post.nickname}`}>{post.nickname}</S.Nickname>
                <S.Date>{DisplayPostDate(post.createDate)}</S.Date>
                <S.Like>
                  <LikeIcon />
                  <S.LikeCount>{post.likeCnt}</S.LikeCount>
                </S.Like>
              </S.Footer>
            </S.CardContents>
          ))
        ) : (
          <S.NothingMessage>{guide ?? ETC_MESSAGE.FIRST_POST}</S.NothingMessage>
        )}
      </S.CardLayout>
    </S.CardStyle>
  );
}
