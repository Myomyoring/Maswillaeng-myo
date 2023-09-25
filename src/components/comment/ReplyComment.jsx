import { useEffect, useState } from 'react';
import axios from 'axios';

import { displayCreatedAt } from '../../utils/display_date';
import { useAuth } from '../../context/ProvideAuthContext';

import styled from 'styled-components';
import tw from 'twin.macro';
import RecommentIcon from '../../statics/svg/recomment_icon';

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

const Div = styled.div`
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
  nick,
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
  // 리플 목록
  const [replyList, setReplyList] = useState([]);

  useEffect(() => {
    getReply(comment.commentId);
  }, [comment]);

  // 리플 리스트 요청
  const getReply = async (commentId) => {
    try {
      const response = await axios.get(`/api/comment/reply/${commentId}`);
      console.log(response.data);
      setReplyList(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const replySubmit = async () => {
    if (replySelect.replyComment === '') return;

    try {
      const token = getUserToken();
      if (!token) return;
      const response = await axios.post(
        `/api/comment/reply`,
        {
          parentId: replySelect.replyId,
          content: replySelect.replyComment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      getPost();
      setReplyMode(false);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteReply = async (replyId) => {
    if (window.confirm('정말 답글을 삭제하시겠습니까?')) {
      try {
        const token = getUserToken();
        if (!token) return;
        const response = await axios.delete(`/api/comment/reply/${comment.commentId}/${replyId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
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
        <ReComments>
          <ProfileImg src={comment.userImage} />
          <Div>
            <RecommentIcon />
            <span>{nick}</span>
            <WriteComment
              value={replySelect.replyComment}
              onChange={(e) => setReplySelect({ ...replySelect, replyComment: e.target.value })}
              maxLength="200"
              placeholder="댓글을 작성해주세요. (최대 200자)"
            />
            <button onClick={() => replySubmit()}>작성</button>
            <button onClick={() => setReplyMode(false)}>취소</button>
          </Div>
        </ReComments>
      ) : (
        replyList.map((reply, index) => (
          <ReComments key={index}>
            <ProfileImg src={reply.userImage} />
            <Div>
              <RecommentIcon />
              <span>{reply.nickname}</span>
              <span>{displayCreatedAt(reply.createDate)}</span>
              <p>{reply.content}</p>
              <button onClick={() => handleCreateReply(comment.commentId)}>답글</button>
              {reply.nickname === nickname ? <button onClick={() => deleteReply(reply.commentId)}>삭제</button> : null}
            </Div>
          </ReComments>
        ))
      )}
      {/* {
            // 대댓글이 수정 중일 경우
            editReply ? (
              <ReComments>
                <Image src="" />
                <Div>
                  <RecommentIcon />
                  <span>닉네임</span>
                  <span></span>
                  <WriteComment placeholder="댓글을 작성해주세요 . " />
                  <button>작성</button>
                  <button onClick={setEditReply(false)}>취소</button>
                </Div>
              </ReComments>
            ) : (
              // 대댓글이 수정 중이 아닐 경우
              <ReComments>
                <Image src="" />
                <Div>
                  <RecommentIcon />
                  <span>닉네임</span>
                  <span></span>
                  <div>
                    컨텐츠컨텐츠컨텐츠컨텐츠컨텐츠컨텐츠컨텐츠컨텐츠컨텐츠컨텐츠컨텐츠컨텐츠컨텐츠컨텐츠컨텐츠컨텐츠컨텐츠컨텐츠컨텐츠컨텐츠컨텐츠컨텐츠컨텐츠컨텐츠컨텐츠컨텐츠컨텐츠컨텐츠컨텐츠컨텐츠
                  </div>
                  <button>삭제</button>
                  <button>답글</button>
                  <button>신고</button>
                </Div>
              </ReComments>
            )
          } */}
    </>
  );
}
