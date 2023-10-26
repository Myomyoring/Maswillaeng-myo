import { Link } from 'react-router-dom';

import { DisplayPostDate } from '../../../utils/display_date';

import styled from 'styled-components';
import tw from 'twin.macro';
import ReplyIcon from '../../../statics/svg/reply_icon';

const ReComments = styled.div`
  ${tw`
        flex items-center
        p-3 pl-10
        bg-lightgray
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

const ReplyContent = styled.div`
  ${tw`
        w-full
        my-1 pl-3
  `}
  span {
    ${tw`
        font-bold
    `}
  }
  p {
    ${tw`
        text-darkgray
        overflow-hidden
    `}
  }
`;

const WriteComment = styled.textarea`
  ${tw`
    w-10/12
    p-3
    block
  bg-white
    border-solid border-gray
  `}
`;

export default function ReplyCommentPresenter({
  nickname,
  comment,
  replyMode,
  setReplyMode,
  replySelect,
  setReplySelect,
  updateReply,
  createReplyHandler,
  saveReply,
  modifyReplyHandler,
  deleteReply,
  replies,
}) {
  return (
    <>
      {replyMode && replySelect.parentId === comment.commentId && replySelect.mode === 'update' ? (
        <ReComments>
          <ProfileImg src={comment.userImage} />
          <ReplyContent>
            <ReplyIcon />
            <span>{nickname}</span>
            <WriteComment
              value={replySelect.replyComment}
              onChange={(event) => setReplySelect({ ...replySelect, replyComment: event.target.value })}
              maxLength="200"
              placeholder="댓글을 작성해주세요. (최대 200자)"
            />
            <button onClick={() => updateReply()}>수정</button>
            <button onClick={() => setReplyMode(false)}>취소</button>
          </ReplyContent>
        </ReComments>
      ) : (
        replies.map(
          (reply, index) =>
            comment.commentId === reply.parentId && (
              <ReComments key={index}>
                <ProfileImg src={reply.userImage} />
                <ReplyContent>
                  <ReplyIcon />
                  <Link to={`/user/${reply.nickname}`}>
                    <span>{reply.nickname}</span>
                  </Link>
                  <span>{DisplayPostDate(reply.createDate)}</span>
                  <p>{reply.comment}</p>
                  <button onClick={() => createReplyHandler(comment.commentId)}>답글</button>
                  {reply.nickname === nickname ? (
                    <>
                      <button onClick={() => modifyReplyHandler(reply.parentId, reply.commentId, reply.comment)}>
                        수정
                      </button>
                      <button onClick={() => deleteReply(reply.commentId)}>삭제</button>
                    </>
                  ) : null}
                </ReplyContent>
              </ReComments>
            ),
        )
      )}
      {replyMode && replySelect.parentId === comment.commentId && replySelect.mode === 'create' ? (
        <ReComments>
          <ProfileImg src={comment.userImage} />
          <ReplyContent>
            <ReplyIcon />
            <span>{nickname}</span>
            <WriteComment
              value={replySelect.replyComment}
              onChange={(event) => setReplySelect({ ...replySelect, replyComment: event.target.value })}
              maxLength="200"
              placeholder="댓글을 작성해주세요. (최대 200자)"
            />
            <button onClick={() => saveReply()}>작성</button>
            <button onClick={() => setReplyMode(false)}>취소</button>
          </ReplyContent>
        </ReComments>
      ) : null}
    </>
  );
}
