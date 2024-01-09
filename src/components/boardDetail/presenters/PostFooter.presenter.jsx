import { Link } from 'react-router-dom';

import styled from 'styled-components';
import tw from 'twin.macro';
import DeleteIcon from '../../../statics/svg/delete_icon';
import EditIcon from '../../../statics/svg/edit_icon';
import KebabIcon from '../../../statics/svg/kebab_icon';
import ShareIcon from '../../../statics/svg/share_icon';

const PostFooterStyle = styled.div`
  ${tw`
      flex justify-end
  `}
`;
const PostToolsBox = styled.div`
  ${tw` 
        flex gap-4
        border-solid border-2 border-point rounded-full

        tablet:px-5
        tablet:py-2
        mobile:px-2
        mobile:py-1
    `}
  svg {
    ${tw`
        fill-point
      `}
  }
`;

const ShareButton = styled.button`
  ${tw`p-0`}
`;

export default function PostFooterPresenter({ nickname, postId, sharePost, deletePost, writer }) {
  return (
    <PostFooterStyle>
      <PostToolsBox>
        <ShareButton onClick={() => sharePost()}>
          <ShareIcon />
        </ShareButton>
        {/* 케밥 아이콘 클릭 -> 수정, 삭제 버튼 툴팁 레이어로 수정하기 */}
        <KebabIcon />
        {nickname === writer ? (
          <>
            <Link to={`/boardModify/${postId}/${writer}`}>
              <EditIcon />
            </Link>
            <button onClick={deletePost}>
              <DeleteIcon />
            </button>
          </>
        ) : null}
      </PostToolsBox>
    </PostFooterStyle>
  );
}
