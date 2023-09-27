import { useAuth } from '../../context/ProvideAuthContext';
import { useEffect, useState } from 'react';

import { commentService } from '../../services/comment.service';
import { displayCreatedAt } from '../../utils/display_date';
import ReplyComment from './ReplyComment';

import styled from 'styled-components';
import tw from 'twin.macro';
import { Link } from 'react-router-dom';

const Count = styled.div`
  ${tw`
    py-5 
    font-semibold text-lg
  `}// span {
  //   ${tw`
  //     font-bold text-point
  //   `}
  // }
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

export default function CommentList({ comments, getPost }) {
  const { getUserToken, currentUser } = useAuth();
  const token = getUserToken();
  const { nickname } = currentUser();

  const [modifyMode, setModifyMode] = useState(false);
  const [replyMode, setReplyMode] = useState(false);
  const [modifySelect, setModifySelect] = useState({ modifyCommentId: 0, modifyContent: '' });
  const [replySelect, setReplySelect] = useState({ mode: '', parentId: 0, replyId: 0, replyComment: '' });

  const modifyCommentHandler = (id, content) => {
    setModifyMode(true);
    setModifySelect({ modifyCommentId: id, modifyContent: content });
  };

  const createReplyHandler = (parentId) => {
    setReplyMode(true);
    setReplySelect({ mode: 'create', parentId: parentId });
  };

  const updateComment = async () => {
    try {
      if (!token) return;

      const response = await commentService.updateComment({
        commentId: modifySelect.modifyCommentId,
        content: modifySelect.modifyContent,
        token,
      });
      if (response.statusText === 'OK') {
        setModifyMode(false);
        getPost();
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const deleteComment = async (commentId) => {
    if (window.confirm('정말 댓글을 삭제하시겠습니까?')) {
      try {
        if (!token) return;
        const response = await commentService.deleteComment({ commentId, token });
        if (response.statusText === 'OK') {
          getPost();
        }
      } catch (error) {
        console.log(error.message);
      }
    } else return;
  };

  return (
    <>
      <Count>
        댓글 <span></span>
      </Count>
      {comments?.map((comment, index) =>
        modifyMode && comment.commentId === modifySelect.modifyCommentId ? (
          <Comments key={index}>
            <ProfileImg src={comment.userImage} />
            <CommentContent>
              <span>{comment.nickname}</span>
              <span>{displayCreatedAt(comment.createDate)}</span>
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
                <span>{displayCreatedAt(comment.createDate)}</span>
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
