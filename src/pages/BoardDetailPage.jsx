import React, { useEffect, useState } from 'react'; // eslint-disable-line no-unused-vars
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import DOMPurify from 'dompurify';
import { styled } from 'styled-components';
import tw from 'twin.macro';
import { AuthContext } from '../auth/ProvideAuthContext';
import { diplayBoardDetailDate, displayCreatedAt } from '../utils/displayDate';

import ShareIcon from '../statics/svg/shareIcon';
import EditIcon from '../statics/svg/editIcon';
import DeleteIcon from '../statics/svg/deleteIcon';
import FullHeartIcon from '../statics/svg/fullHeartIcon';
import EmptyHeartIcon from '../statics/svg/emptyHeartIcon';
// import LockIcon from '../statics/svg/lockIcon';
import RecommentIcon from '../statics/svg/recommentIcon';

const BoardDetailContainer = styled.div`
  ${tw`
        w-2/3 h-full
        m-auto py-20
    `}
`;

const BoardTitle = styled.div`
  ${tw`
        mt-10 mb-2
    `}
`;

const Category = styled.h3`
  ${tw`
        my-3
        font-bold text-point
    `}
`;

const Title = styled.div`
  ${tw`
        mb-5 text-2xl font-black
    `}
`;

const Image = styled.img`
  ${tw`
        w-10 h-10
        min-w-min min-h-min
        border-solid border-gray
        rounded-full object-cover
    `}
`;

const ProfileBox = styled.div`
  ${tw`
        flex items-center
    `}

  span {
    ${tw`
        px-2
        font-bold text-xs text-darkgray
    `}
  }

  div {
    ${tw`
        px-2
        font-bold
    `}
  }
`;

const Content = styled.div`
  ${tw`
        w-full h-auto
        p-10
        border-solid border-gray
        bg-white
    `}

  img {
    ${tw`
        m-auto
      `}
  }
`;

const ButtonBox = styled.div`
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

const CommentBox = styled.div`
  ${tw`
        w-full
        p-5
        bg-lightgray
        border-solid border-t-gray border-l-0 border-r-0 border-b-0

    `}
`;

const CommentCnt = styled.div`
  ${tw`
    py-5 
    font-semibold text-lg
  `}
  span {
    ${tw`
    font-bold text-point
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

const CommentContents = styled.div`
  ${tw`
        mt-3 text-right
  `}

  * {
    ${tw`
        mx-0.5
    `}
  }

  span {
    ${tw`
        text-xxs
    `}
  }

  button {
    ${tw`
        ml-5 px-5
    `}
  }
`;

const Button = styled(Link)`
  ${tw`
        p-3
      bg-point
        font-bold text-white text-sm
        cursor-pointer
    `}
`;

const CommentList = styled.div`
  ${tw`
    bg-white

  `}
  textarea
`;

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

const ReComments = styled.div`
  ${tw`
        flex items-center
        p-3 pl-14
        bg-lightgray
  `}

  * {
    ${tw`
        p-1 text-sm
   `}
  }
`;
export default function BoardDetailPage() {
  const [nick, setNick] = useState('');
  const { postId } = useParams();
  const { getUserToken, currentUser } = AuthContext();
  const navigate = useNavigate();
  const [post, setPost] = useState({});
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');
  const [editComment, setEditComment] = useState(false);
  const [selected, setSelected] = useState({ selectedId: 0, selectedComment: '' });

  // ㅠㅠ 리플
  const [replyList, setReplyList] = useState([]);
  const [reply, setReply] = useState({ replyId: 0, replyComment: '' });
  const [editReply, setEditReply] = useState(false);
  const [selectedReply, setSelectedReply] = useState({
    selectedReplyId: 0,
    selectedReplyComment: '',
  });

  useEffect(() => {
    getPost();
  }, [postId]);

  const getPost = async () => {
    try {
      const response = await axios.get(`/api/post/${postId}`);
      if (response.statusText === 'OK') {
        // console.log(response.data);
        setPost(response.data);
        setComments(response.data.commentList);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getReply = async (commentId) => {
    try {
      const response = await axios.get(`/api/comment/reply/${commentId}`);
      console.log(response.data);
      // response.then((res) => setReplyList(res.data));
      // setReplyList(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const sharePost = async () => {
    const baseUrl = 'http://localhost:3000';
    const pathname = window.location.pathname;
    const url = baseUrl + pathname;

    try {
      const res = await navigator.clipboard.writeText(url);
      alert('클립 보드에 링크가 복사 되었습니다.');
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  const deletePost = async () => {
    if (window.confirm('정말 게시물을 삭제하시겠습니까?')) {
      try {
        const response = await axios.delete(`/api/post/${postId}`);
        if (response.statusText === 'OK') {
          navigate('/', { replace: true });
          alert('삭제 되었습니다.');
        }
      } catch (err) {
        console.log(err);
      }
    } else return;
  };

  const commentWrite = ({ target }) => {
    const { value } = target;
    setComment(value);
    console.log(comment);
  };

  const commentSubmit = async () => {
    if (comment === '') {
      alert('댓글을 입력해주세요');
      return;
    }
    try {
      const token = getUserToken();
      if (!token) return;

      const response = await axios.post(
        '/api/comment',
        { postId: postId, content: comment },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response.statusText === 'OK') {
        setComment('');
        getPost();
      }
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  const edit = (id, content) => {
    setSelected({ selectedId: id, selectedComment: content });
    setEditComment(true);
  };

  const eEdit = (id, content) => {
    setSelectedReply({ selectedReplyId: id, selectedReplyComment: content });
  };

  const updateComment = async () => {
    try {
      const token = getUserToken();
      if (!token) return;

      const response = await axios.put(
        '/api/comment',
        { commentId: selected.selectedId, content: selected.selectedComment },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response.statusText === 'OK') {
        setEditComment(false);
        setComment('');
        getPost();
      }
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

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
          console.log(response);
          getPost();
        }
      } catch (err) {
        console.log(err);
      }
    } else return;
  };

  const createReply = (parentId) => {
    const user = currentUser();
    setNick(user.nickname);
    setEditReply(true);
    setReply({ replyId: parentId });
  };

  const replySubmit = async () => {
    if (reply.replyComment === '') return;

    try {
      const token = getUserToken();
      if (!token) return;
      const response = await axios.post(
        `/api/comment/reply`,
        {
          parentId: reply.replyId,
          content: reply.replyComment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log(response);
      getPost();
      setEditReply(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleLike = async () => {
    try {
      const token = getUserToken();
      if (!token) return;
      await axios.post(
        `/api/like/${postId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setLiked(true);
      getPost();
    } catch (error) {
      setLiked(true);
      console.error(error);
    }
  };

  const deleteLike = async () => {
    try {
      const token = getUserToken();
      if (!token) return;
      await axios.delete(`/api/like/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      getPost();
      setLiked(false);
    } catch (error) {
      setLiked(false);
      console.error(error);
    }
  };

  return (
    <>
      <BoardDetailContainer>
        <BoardTitle>
          <Category>{post.category}</Category>
          <Title>{post.title}</Title>
          <ProfileBox>
            <Image src={post.userImage} />
            <div>{post.nickname}</div>
            <span>|</span>
            <span>{diplayBoardDetailDate(post.createdDate)}</span>
          </ProfileBox>
        </BoardTitle>

        <Content
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(String(post.content)),
          }}
        />

        <ButtonBox>
          <Likes>
            {liked ? (
              <span onClick={deleteLike}>
                <FullHeartIcon />
              </span>
            ) : (
              <span onClick={handleLike}>
                <EmptyHeartIcon />
              </span>
            )}
            {post.likeCnt}
          </Likes>
          <Buttons>
            <button onClick={() => sharePost()}>
              <ShareIcon />
            </button>
            <Link to={`/boardmodify/${postId}`}>
              <EditIcon />
            </Link>
            <button onClick={deletePost}>
              <DeleteIcon />
            </button>
          </Buttons>
        </ButtonBox>

        <CommentBox>
          <WriteComment
            value={comment}
            onChange={commentWrite}
            placeholder="댓글을 작성해주세요 ."
          />
          <CommentContents>
            {/* <span>비밀 댓글</span>
            <LockIcon />
            <input type="checkbox" alt="비밀 댓글" /> */}
            <Button onClick={commentSubmit}>등록</Button>
          </CommentContents>
        </CommentBox>

        <CommentCnt>
          댓글 <span>{comments.length}</span>
        </CommentCnt>

        <CommentList>
          {comments.map((comment) =>
            editComment && selected.selectedId === comment.commentId ? (
              <Comments key={comment.commentId}>
                <Image src={comment.userImage} />
                <Div>
                  <span>{comment.nickname}</span>
                  <span>{displayCreatedAt(comment.createDate)}</span>
                  <WriteComment
                    value={selected.selectedComment}
                    onChange={(e) => {
                      setSelected({ ...selected, selectedComment: e.target.value });
                    }}
                    placeholder="댓글을 작성해주세요 . "
                  />
                  <button onClick={updateComment}>수정</button>
                  <button onClick={() => setEditComment(false)}>취소</button>
                </Div>
              </Comments>
            ) : (
              <div key={comment.commentId}>
                <Comments>
                  <Image src={comment.userImage} />
                  <Div>
                    <span>{comment.nickname}</span>
                    <span>{displayCreatedAt(comment.createDate)}</span>
                    <div>{comment.content}</div>
                    <button onClick={() => edit(comment.commentId, comment.content)}>수정</button>
                    <button onClick={() => createReply(comment.commentId)}>답글</button>
                    <button>신고</button>
                    <button onClick={() => deleteComment(comment.commentId)}>삭제</button>
                  </Div>
                </Comments>
                {editReply && (
                  <ReComments>
                    <Image src="" />
                    <Div>
                      <RecommentIcon />
                      <span>{nick}</span>
                      <span></span>
                      <WriteComment
                        value={reply.replyComment}
                        onChange={(e) => setReply({ ...reply, replyComment: e.target.value })}
                        placeholder="댓글을 작성해주세요. "
                      />
                      <button onClick={() => replySubmit()}>작성</button>
                      <button onClick={() => setEditReply(false)}>취소</button>
                    </Div>
                  </ReComments>
                )}
                {
                  (getReply(comment.commentId),
                  replyList?.map((reply) => (
                    <ReComments key={reply.commentId}>
                      <Image src={reply.userImage} />
                      <Div>
                        <RecommentIcon />
                        <span>{reply.nickname}</span>
                        <span>{displayCreatedAt(reply.createDate)}</span>
                        <div>{reply.content}</div>
                        <button>삭제</button>
                        <button>답글</button>
                        <button>신고</button>
                      </Div>
                    </ReComments>
                  )))
                }
              </div>
            ),
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
        </CommentList>
        <Button to={'/'}>목록으로</Button>
      </BoardDetailContainer>
    </>
  );
}
