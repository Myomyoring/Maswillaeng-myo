import * as S from './styles/index';

export default function UpdateCommentBox({ comment, updateSelect, onCommentChange, onUpdateComment, setUpdateMode }) {
  return (
    <S.Comments>
      <S.ProfileImage src={comment.userImage} />
      <S.CommentContent>
        <S.NickNameText>{comment.nickname}</S.NickNameText>
        <S.WriteComment value={updateSelect.comment} onChange={onCommentChange} placeholder="댓글을 작성해주세요." />
        <S.Button onClick={onUpdateComment}>수정</S.Button>
        <S.Button onClick={() => setUpdateMode(false)}>취소</S.Button>
      </S.CommentContent>
    </S.Comments>
  );
}
