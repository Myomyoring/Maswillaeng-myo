import { Link } from 'react-router-dom';
import { DisplayPostDate } from '../../utils/display_date';

import * as S from './styles/index';
import ReplyIcon from '../../statics/svg/reply_icon';

export default function ReplyBox({ nickname, comment, reply, createReplyHandler, updateReplyHandler, onDeleteReply }) {
  return (
    <S.ReplyBoxStyle>
      <S.ProfileImage src={reply.userImage} />
      <S.CommentContent>
        <S.CommentInfoBox>
          <ReplyIcon />
          <Link to={`/user/${reply.nickname}`}>
            <S.NickNameText>{reply.nickname}</S.NickNameText>
          </Link>
          <S.DateText>{DisplayPostDate(reply.createDate)}</S.DateText>
        </S.CommentInfoBox>
        <S.CommentContent>{reply.comment}</S.CommentContent>
        <S.ButtonBox>
          <S.Button onClick={() => createReplyHandler(comment.commentId)}>답글</S.Button>
          {reply.nickname === nickname ? (
            <>
              <S.Button onClick={() => updateReplyHandler(reply.parentId, reply.commentId, reply.comment)}>
                수정
              </S.Button>
              <S.Button onClick={() => onDeleteReply(reply.commentId)}>삭제</S.Button>
            </>
          ) : null}
        </S.ButtonBox>
      </S.CommentContent>
    </S.ReplyBoxStyle>
  );
}
