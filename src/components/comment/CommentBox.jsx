import { Link } from 'react-router-dom';

import { DisplayPostDate } from '../../utils/display_date';

import * as S from './styles/index';

export default function CommentBox({ nickname, comment, createReplyHandler, updateCommentHandler, onDeleteComment }) {
  return (
    <S.Comments>
      <S.ProfileImage src={comment.userImage} />
      <S.CommentContent>
        <S.CommentInfoBox>
          <Link to={`/user/${comment.nickname}`}>
            <S.NickNameText>{comment.nickname}</S.NickNameText>
          </Link>
          <S.DateText>{DisplayPostDate(comment.createDate)}</S.DateText>
        </S.CommentInfoBox>
        <S.ContentBox>{comment.comment}</S.ContentBox>
        <S.ButtonBox>
          <S.Button onClick={() => createReplyHandler(comment.commentId)}>답글</S.Button>
          {comment.nickname === nickname ? (
            <>
              <S.Button onClick={() => updateCommentHandler(comment.commentId, comment.comment)}>수정</S.Button>
              <S.Button onClick={() => onDeleteComment(comment.commentId)}>삭제</S.Button>
            </>
          ) : null}
        </S.ButtonBox>
      </S.CommentContent>
    </S.Comments>
  );
}
