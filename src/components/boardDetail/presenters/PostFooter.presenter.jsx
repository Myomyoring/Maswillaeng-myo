import { Link } from 'react-router-dom';

import styled from 'styled-components';
import tw from 'twin.macro';
import DeleteIcon from '../../../statics/svg/delete_icon';
import EditIcon from '../../../statics/svg/edit_icon';
import EmptyHeartIcon from '../../../statics/svg/empty_heart_icon';
import FullHeartIcon from '../../../statics/svg/full_heart_icon';
import ShareIcon from '../../../statics/svg/share_icon';

const PostBottomStyle = styled.div`
  ${tw`
      flex justify-between
  `}
`;

const Likes = styled.span`
  ${tw`
     flex items-center
  `}
`;

const Buttons = styled.span`
  ${tw`
        m-3 p-2 
        flex
        border-solid border-point rounded-full
    `}

  button, a {
    ${tw`
        px-2
        `}

    svg {
      ${tw`
        fill-point
        `}
    }
  }
`;

export default function PostFooterPresenter({
  nickname,
  post,
  postId,
  liked,
  handleLike,
  sharePost,
  deletePost,
  writer,
}) {
  return (
    <PostBottomStyle>
      <Likes>
        {liked ? (
          <span onClick={() => handleLike('delete')}>
            <FullHeartIcon />
          </span>
        ) : (
          <span onClick={() => handleLike('save')}>
            <EmptyHeartIcon />
          </span>
        )}
        {post.likeCnt}
      </Likes>
      <Buttons>
        <button onClick={() => sharePost()}>
          <ShareIcon />
        </button>
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
      </Buttons>
    </PostBottomStyle>
  );
}
