import { useAuth } from '../../context/ProvideAuthContext';
import { useState } from 'react';

import { commentService } from '../../services/comment.service';
import { displayCreatedAt } from '../../utils/display_date';
import ReplyComment from './ReplyComment';

import styled from 'styled-components';
import tw from 'twin.macro';

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

  const [editMode, setEditMode] = useState(false);
  const [replyMode, setReplyMode] = useState(false);
  const [modifySelect, setModifySelect] = useState({ modifyCommentId: 0, modifyContent: '' });
  const [replySelect, setReplySelect] = useState({ replyId: 0, replyComment: '' });

  const handleEditComment = (id, content) => {
    setEditMode(true);
    setModifySelect({ modifyCommentId: id, modifyContent: content });
  };

  const handleCreateReply = (parentId) => {
    setReplyMode(true);
    setReplySelect({ replyId: parentId });
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
        setEditMode(false);
        getPost();
      }
    } catch (error) {
      console.log(error);
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
        console.log(error);
      }
    } else return;
  };

  return (
    <>
      {comments?.map((comment, index) =>
        editMode && comment.commentId === modifySelect.modifyCommentId ? (
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
              <button onClick={() => setEditMode(false)}>취소</button>
            </CommentContent>
          </Comments>
        ) : (
          <div key={index}>
            <Comments>
              <ProfileImg src={comment.userImage} />
              <CommentContent>
                <span>{comment.nickname}</span>
                <span>{displayCreatedAt(comment.createDate)}</span>
                <div>{comment.content}</div>
                <button onClick={() => handleCreateReply(comment.commentId)}>답글</button>
                {comment.nickname === nickname ? (
                  <>
                    <button onClick={() => handleEditComment(comment.commentId, comment.content)}>수정</button>
                    <button onClick={() => deleteComment(comment.commentId)}>삭제</button>
                  </>
                ) : null}
              </CommentContent>
            </Comments>
            <ReplyComment
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
    </>
  );
}
