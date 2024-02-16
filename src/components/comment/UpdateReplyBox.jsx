import * as S from './styles/index';
import ReplyIcon from '../../statics/svg/reply_icon';

export default function UpdateReplyBox({ comment, nickname, replySelect, onReplyChange, onUpdateReply, setReplyMode }) {
  return (
    <S.ReplyBoxStyle>
      <S.ProfileImage src={comment.userImage} />
      <S.CommentContent>
        <S.CommentInfoBox>
          <ReplyIcon />
          <S.NickNameText>{nickname}</S.NickNameText>
        </S.CommentInfoBox>
        <S.WriteComment
          value={replySelect.replyComment}
          onChange={onReplyChange}
          maxLength="200"
          placeholder="댓글을 작성해주세요. (최대 200자)"
        />
        <S.ButtonBox>
          <S.Button onClick={onUpdateReply}>수정</S.Button>
          <S.Button onClick={() => setReplyMode(false)}>취소</S.Button>
        </S.ButtonBox>
      </S.CommentContent>
    </S.ReplyBoxStyle>
  );
}
