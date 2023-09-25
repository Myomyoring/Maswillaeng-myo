import { useAuth } from '../../context/ProvideAuthContext';
import { useState } from 'react';

import { commentService } from '../../services/comment.service';
import { displayCreatedAt } from '../../utils/display_date';
import ModifyComment from './ModifyComment';
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
  const { getUserToken, currentUser } = useAuth();
  const token = getUserToken();
  const { nickname } = currentUser();

  const [nick, setNick] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [replyMode, setReplyMode] = useState(false);
  const [modifySelect, setModifySelect] = useState({ modifyCommentId: 0, modifyContent: '' });
  const [replySelect, setReplySelect] = useState({ replyId: 0, replyComment: '' });

  const handleEditComment = (id, content) => {
    setEditMode(true);
    setModifySelect({ modifyCommentId: id, modifyContent: content });
  };

  const handleCreateReply = (parentId) => {
    const user = currentUser();
    setNick(user.nickname);
    setReplyMode(true);
    setReplySelect({ replyId: parentId });
  };

  const deleteComment = async (commentId) => {
    if (window.confirm('정말 댓글을 삭제하시겠습니까?')) {
      try {
        if (!token) return;
        const response = await commentService.deleteComment({ commentId, token });
        if (response.statusText === 'OK') {
          getPost();
        }
      } catch (err) {
        console.log(err);
      }
    } else return;
  };

  return (
    <>
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
                <button onClick={() => handleCreateReply(comment.commentId)}>답글</button>
                {comment.nickname === nickname ? (
                  <>
                    <button onClick={() => handleEditComment(comment.commentId, comment.content)}>수정</button>
                    <button onClick={() => deleteComment(comment.commentId)}>삭제</button>
                  </>
                ) : null}
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
    </>
  );
}
