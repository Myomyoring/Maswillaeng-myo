import { useEffect, useState } from 'react';

import { commentService } from '../../services/comment.service';
import { displayCreatedAt } from '../../utils/display_date';
import { useAuth } from '../../context/ProvideAuthContext';

import styled from 'styled-components';
import tw from 'twin.macro';
import ReplyIcon from '../../statics/svg/reply_icon';
import { Link } from 'react-router-dom';

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

export default function ReplyComment({
  comment,
  replyMode,
  setReplyMode,
  replySelect,
  setReplySelect,
  getPost,
  createReplyHandler,
}) {
  const { getUserToken, currentUser } = useAuth();
  const { nickname } = currentUser();
  const token = getUserToken();
  const [replyList, setReplyList] = useState([]);

  useEffect(() => {
    getReply(comment.commentId);
  }, [comment]);

  const getReply = async (commentId) => {
    try {
      const { data } = await commentService.getReply({ commentId });
      setReplyList(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const saveReply = async () => {
    if (replySelect.replyComment === '') return;

    try {
      if (!token) return;
      const response = await commentService.saveReply({
        parentId: replySelect.parentId,
        content: replySelect.replyComment,
        token,
      });
      if (response.statusText === 'OK') {
        getPost();
        setReplyMode(false);
      } else return;
    } catch (error) {
      console.log(error.message);
    }
  };

  const modifyReplyHandler = async (parentId, replyId, content) => {
    setReplyMode(true);
    setReplySelect({ mode: 'update', parentId: parentId, replyId: replyId, replyComment: content });
  };

  const updateReply = async () => {
    try {
      const response = await commentService.updateReply({
        replyId: replySelect.replyId,
        content: replySelect.replyComment,
        token,
      });
      if (response.statusText === 'OK') {
        getPost();
        setReplyMode(false);
      } else return;
    } catch (error) {
      console.log(error.message);
    }
  };

  const deleteReply = async (replyId) => {
    if (window.confirm('정말 답글을 삭제하시겠습니까?')) {
      try {
        if (!token) return;
        const response = await commentService.deleteReply({ parentId: comment.commentId, replyId, token });
        if (response.statusText === 'OK') {
          getPost();
          console.log(response);
        } else return;
      } catch (error) {
        console.log(error);
      }
    } else return;
  };

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
        replyList.map((reply, index) => (
          <ReComments key={index}>
            <ProfileImg src={reply.userImage} />
            <ReplyContent>
              <ReplyIcon />
              <Link to={`/user/${reply.nickname}`}>
                <span>{reply.nickname}</span>
              </Link>
              <span>{displayCreatedAt(reply.createDate)}</span>
              <p>{reply.content}</p>
              <button onClick={() => createReplyHandler(comment.commentId)}>답글</button>
              {reply.nickname === nickname ? (
                <>
                  <button onClick={() => modifyReplyHandler(comment.commentId, reply.commentId, reply.content)}>
                    수정
                  </button>
                  <button onClick={() => deleteReply(reply.commentId)}>삭제</button>
                </>
              ) : null}
            </ReplyContent>
          </ReComments>
        ))
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
