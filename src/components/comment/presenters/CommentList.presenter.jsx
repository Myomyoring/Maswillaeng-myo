import { Link } from 'react-router-dom';

import { DisplayPostDate } from '../../../utils/display_date';
import ReplyComment from '../containers/ReplyComment.container';

import styled from 'styled-components';
import tw from 'twin.macro';

const Count = styled.div`
  ${tw`
      py-5 
      font-semibold text-lg
    `}
`;

const Comments = styled.div`
  ${tw`
      p-3
      flex items-center
    bg-white
  `}

  * {
    ${tw`
        p-1 text-sm
   `}
  }
`;

const ProfileImg = styled.img`
  ${tw`
    w-10 h-10
    border-solid border-gray
    rounded-full object-cover
    `}
`;

const CommentContent = styled.div`
  ${tw`
        w-full
        my-1 pl-3
  `}
  span {
    ${tw`
        font-bold
    `}
  }
  div {
    ${tw`
        text-darkgray
        overflow-visible
    `}
  }
  button {
    ${tw`
        text-sm
    `}
  }
`;

const WriteComment = styled.textarea`
  ${tw`
        w-full
        p-3
        block
        bg-white
        border-solid border-gray
    `}
`;

export default function CommentListPresenter({
  getPost,
  nickname,
  comments,
  commentCount,
  modifyMode,
  modifySelect,
  setModifySelect,
  setModifyMode,
  createReplyHandler,
  modifyCommentHandler,
  deleteComment,
  updateComment,
  replyMode,
  replySelect,
  setReplyMode,
  setReplySelect,
}) {
  return (
    <>
      <Count>
        댓글 <span>{commentCount}</span>
      </Count>
      {comments?.map((comment, index) =>
        modifyMode && comment.commentId === modifySelect.modifyCommentId ? (
          <Comments key={index}>
            <ProfileImg src={comment.userImage} />
            <CommentContent>
              <span>{comment.nickname}</span>
              <span>{DisplayPostDate(comment.createDate)}</span>
              <WriteComment
                value={modifySelect.modifyContent}
                onChange={(e) => {
                  setModifySelect({ ...modifySelect, modifyContent: e.target.value });
                }}
                placeholder="댓글을 작성해주세요. "
              />
              <button onClick={updateComment}>수정</button>
              <button onClick={() => setModifyMode(false)}>취소</button>
            </CommentContent>
          </Comments>
        ) : (
          <div key={index}>
            <Comments>
              <ProfileImg src={comment.userImage} />
              <CommentContent>
                <Link to={`/user/${comment.nickname}`}>
                  <span>{comment.nickname}</span>
                </Link>
                <span>{DisplayPostDate(comment.createDate)}</span>
                <div>{comment.content}</div>
                <button onClick={() => createReplyHandler(comment.commentId)}>답글</button>
                {comment.nickname === nickname ? (
                  <>
                    <button onClick={() => modifyCommentHandler(comment.commentId, comment.content)}>수정</button>
                    <button onClick={() => deleteComment(comment.commentId)}>삭제</button>
                  </>
                ) : null}
              </CommentContent>
            </Comments>
            <ReplyComment
              {...{
                comment,
                replyMode,
                setReplyMode,
                replySelect,
                setReplySelect,
                getPost,
                createReplyHandler,
              }}
            />
          </div>
        ),
      )}
    </>
  );
}
