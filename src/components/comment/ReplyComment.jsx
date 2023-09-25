import { useEffect, useState } from 'react';

import { displayCreatedAt } from '../../utils/display_date';
import { useAuth } from '../../context/ProvideAuthContext';

import styled from 'styled-components';
import tw from 'twin.macro';
import ReplyIcon from '../../statics/svg/reply_icon';
import { commentService } from '../../services/comment.service';

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
  handleCreateReply,
}) {
  const { getUserToken, currentUser } = useAuth();
  const { nickname } = currentUser();
  const token = getUserToken();
  // 리플 목록
  const [replyList, setReplyList] = useState([]);

  useEffect(() => {
    getReply(comment.commentId);
  }, [comment]);

  // 리플 리스트 요청
  const getReply = async (commentId) => {
    try {
      const { data } = await commentService.getReply({ commentId });
      setReplyList(data);
    } catch (error) {
      console.log(error);
    }
  };

  const replySubmit = async () => {
    if (replySelect.replyComment === '') return;

    try {
      if (!token) return;
      const response = await commentService.submitReply({
        parentId: replySelect.replyId,
        content: replySelect.replyComment,
        token,
      });
      getPost();
      setReplyMode(false);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteReply = async (replyId) => {
    if (window.confirm('정말 답글을 삭제하시겠습니까?')) {
      try {
        if (!token) return;
        const response = await commentService.deleteReply({ commentId: comment.commentId, replyId, token });
        if (response.statusText === 'OK') {
          getPost();
          console.log(response);
        }
      } catch (error) {
        console.log(error);
      }
    } else return;
  };

  return (
    <>
      {replyMode && replySelect.replyId === comment.commentId ? (
        // 리플 생성 파트 -> 리플 수정 재사용 할 순 없을까?
        <ReComments>
          <ProfileImg src={comment.userImage} />
          <ReplyContent>
            <ReplyIcon />
            <span>{nickname}</span>
            <WriteComment
              value={replySelect.replyComment}
              onChange={(e) => setReplySelect({ ...replySelect, replyComment: e.target.value })}
              maxLength="200"
              placeholder="댓글을 작성해주세요. (최대 200자)"
            />
            <button onClick={() => replySubmit()}>작성</button>
            <button onClick={() => setReplyMode(false)}>취소</button>
          </ReplyContent>
        </ReComments>
      ) : (
        replyList.map((reply, index) => (
          <ReComments key={index}>
            <ProfileImg src={reply.userImage} />
            <ReplyContent>
              <ReplyIcon />
              <span>{reply.nickname}</span>
              <span>{displayCreatedAt(reply.createDate)}</span>
              <p>{reply.content}</p>
              <button onClick={() => handleCreateReply(comment.commentId)}>답글</button>
              {reply.nickname === nickname ? <button onClick={() => deleteReply(reply.commentId)}>삭제</button> : null}
            </ReplyContent>
          </ReComments>
        ))
      )}
    </>
  );
}
