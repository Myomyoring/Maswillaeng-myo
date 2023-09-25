import styled from 'styled-components';
import tw from 'twin.macro';
import { displayCreatedAt } from '../../utils/display_date';
import { useAuth } from '../../context/ProvideAuthContext';
import axios from 'axios';

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

const WriteComment = styled.textarea`
  ${tw`
        w-full
        p-3
        block
        bg-white
        border-solid border-gray
    `}
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

export default function ModifyComment({ comment, setEditMode, modifySelect, setModifySelect, getPost }) {
  const { getUserToken } = useAuth();

  // 댓글 수정 요청
  const updateComment = async () => {
    try {
      const token = getUserToken();
      if (!token) return;

      const response = await axios.put(
        '/api/comment',
        { commentId: modifySelect.modifyCommentId, content: modifySelect.modifyContent },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response.statusText === 'OK') {
        setEditMode(false);
        getPost();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Comments>
      <ProfileImg src={comment.userImage} />
      <Div>
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
      </Div>
    </Comments>
  );
}
