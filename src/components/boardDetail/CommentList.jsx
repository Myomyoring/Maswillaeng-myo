import styled from 'styled-components';
import tw from 'twin.macro';

import { useAuth } from '../../context/ProvideAuthContext';
import { useState } from 'react';
import axios from 'axios';
import { displayCreatedAt } from '../../utils/display_date';
import ModifyComment from './ModifyComment';
import ReplyComment from './ReplyComment';

const Comments = styled.div`
  ${tw`
        flex items-center
        p-3
        
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
    min-w-min min-h-min
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

export default function CommentList({ comments, getPost }) {
  // 대댓 작성 시 표기 할 현재 로그인 한 유저 닉네임
  const [nick, setNick] = useState('');

  const { getUserToken, currentUser } = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [replyMode, setReplyMode] = useState(false);
  // 수정 버튼 클릭 시, 선택된 수정할 댓글
  const [modifySelect, setModifySelect] = useState({ modifyCommentId: 0, modifyContent: '' });
  // 답글 버튼 클릭 시, 선택된 대댓글의 부모 키
  const [replySelect, setReplySelect] = useState({ replyId: 0, replyComment: '' });

  // 수정 버튼 클릭 핸들러
  const handleEditComment = (id, content) => {
    setEditMode(true);
    setModifySelect({ modifyCommentId: id, modifyContent: content });
  };

  // 답글 버튼 클릭 핸들러
  const handleCreateReply = (parentId) => {
    const user = currentUser();
    setNick(user.nickname);
    setReplyMode(true);
    setReplySelect({ replyId: parentId });
  };

  // 댓글 삭제
  const deleteComment = async (commentId) => {
    if (window.confirm('정말 댓글을 삭제하시겠습니까?')) {
      try {
        const token = getUserToken();
        if (!token) return;
        const response = await axios.delete(`/api/comment/${commentId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.statusText === 'OK') {
          getPost();
        }
      } catch (err) {
        console.log(err);
      }
    } else return;
  };

  return (
    <div>
      {comments?.map((comment, index) =>
        editMode && comment.commentId === modifySelect.modifyCommentId ? (
          <ModifyComment
            key={index}
            comment={comment}
            setEditMode={setEditMode}
            modifySelect={modifySelect}
            setModifySelect={setModifySelect}
            getPost={getPost}
          />
        ) : (
          <div key={index}>
            <Comments>
              <ProfileImg src={comment.userImage} />
              <Div>
                <span>{comment.nickname}</span>
                <span>{displayCreatedAt(comment.createDate)}</span>
                <div>{comment.content}</div>
                <button onClick={() => handleEditComment(comment.commentId, comment.content)}>수정</button>
                <button onClick={() => handleCreateReply(comment.commentId)}>답글</button>
                <button>신고</button>
                <button onClick={() => deleteComment(comment.commentId)}>삭제</button>
              </Div>
            </Comments>
            <ReplyComment
              nick={nick}
              comment={comment}
              replyMode={replyMode}
              setReplyMode={setReplyMode}
              replySelect={replySelect}
              setReplySelect={setReplySelect}
              getPost={getPost}
              handleCreateReply={handleCreateReply}
            />
          </div>
        ),
      )}
    </div>
  );
}
