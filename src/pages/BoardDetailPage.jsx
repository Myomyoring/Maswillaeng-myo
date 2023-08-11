import React from 'react'; // eslint-disable-line no-unused-vars
import { styled } from 'styled-components';
import tw from 'twin.macro';
import { diplayBoardDetailDate, displayCreatedAt } from '../utils/displayDate';

import ShareIcon from '../statics/svg/shareIcon';
import EditIcon from '../statics/svg/editIcon';
import DeleteIcon from '../statics/svg/deleteIcon';
import FullHeartIcon from '../statics/svg/fullHeartIcon';
import EmptyHeartIcon from '../statics/svg/emptyHeartIcon';
import LockIcon from '../statics/svg/lockIcon';

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
        w-full h-96
        p-10
        border-solid border-gray
        bg-white
    `}
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

  button {
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

const Button = styled.button`
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
  const boardDate = diplayBoardDetailDate('2023-07-28T02:37:50.615Z');
  const commentDate = displayCreatedAt('2023-07-28T02:37:50.615Z');
  return (
    <>
      <BoardDetailContainer>
        <BoardTitle>
          <Category>카테고리</Category>
          <Title>타이틀</Title>
          <ProfileBox>
            <Image src="" />
            <div>닉네임닉네임닉네임닉네임닉네임</div>
            <span>|</span>
            <span>{boardDate}</span>
          </ProfileBox>
        </BoardTitle>

        <Content>글박스</Content>

        <ButtonBox>
          <Likes>
            <button>
              <EmptyHeartIcon />
            </button>
            <button>
              <FullHeartIcon />
            </button>
            0
          </Likes>
          <Buttons>
            <button>
              <ShareIcon />
            </button>
            <button>
              <EditIcon />
            </button>
            <button>
              <DeleteIcon />
            </button>
          </Buttons>
        </ButtonBox>

        <CommentBox>
          <WriteComment placeholder="댓글을 작성해주세요 ." />
          <CommentContents>
            <span>비밀 댓글</span>
            <LockIcon />
            <input type="checkbox" alt="비밀 댓글" />
            <Button>등록</Button>
          </CommentContents>
        </CommentBox>

        <CommentCnt>
          댓글 <span>0</span>
        </CommentCnt>

        <CommentList>
          <Comments>
            <Image src="" />
            <Div>
              <span>닉네임</span>
              <span>{commentDate}</span>
              <div>
                컨텐츠컨텐츠컨텐츠컨텐츠컨텐츠컨텐츠컨텐츠컨텐츠컨텐츠컨텐츠컨텐츠컨텐츠컨텐츠컨텐츠컨텐츠컨텐츠컨텐츠컨텐츠컨텐츠컨텐츠컨텐츠컨텐츠컨텐츠컨텐츠컨텐츠컨텐츠컨텐츠컨텐츠컨텐츠컨텐츠
              </div>
              <button>삭제</button>
              <button>답글</button>
              <button>신고</button>
            </Div>
          </Comments>

          <Comments>
            <Image src="" />
            <Div>
              <span>닉네임</span>
              <span>{commentDate}</span>
              <WriteComment placeholder="댓글을 작성해주세요 . " />
              <button>수정</button>
              <button>취소</button>
            </Div>
          </Comments>

          <ReComments>
            <Image src="" />
            <Div>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                <path d="M1.75 1h12.5c.966 0 1.75.784 1.75 1.75v9.5A1.75 1.75 0 0 1 14.25 14H8.061l-2.574 2.573A1.458 1.458 0 0 1 3 15.543V14H1.75A1.75 1.75 0 0 1 0 12.25v-9.5C0 1.784.784 1 1.75 1ZM1.5 2.75v9.5c0 .138.112.25.25.25h2a.75.75 0 0 1 .75.75v2.19l2.72-2.72a.749.749 0 0 1 .53-.22h6.5a.25.25 0 0 0 .25-.25v-9.5a.25.25 0 0 0-.25-.25H1.75a.25.25 0 0 0-.25.25Z"></path>
                <path d="M22.5 8.75a.25.25 0 0 0-.25-.25h-3.5a.75.75 0 0 1 0-1.5h3.5c.966 0 1.75.784 1.75 1.75v9.5A1.75 1.75 0 0 1 22.25 20H21v1.543a1.457 1.457 0 0 1-2.487 1.03L15.939 20H10.75A1.75 1.75 0 0 1 9 18.25v-1.465a.75.75 0 0 1 1.5 0v1.465c0 .138.112.25.25.25h5.5a.75.75 0 0 1 .53.22l2.72 2.72v-2.19a.75.75 0 0 1 .75-.75h2a.25.25 0 0 0 .25-.25v-9.5Z"></path>
              </svg>
              <span>닉네임</span>
              <span>{commentDate}</span>
              <div>
                컨텐츠컨텐츠컨텐츠컨텐츠컨텐츠컨텐츠컨텐츠컨텐츠컨텐츠컨텐츠컨텐츠컨텐츠컨텐츠컨텐츠컨텐츠컨텐츠컨텐츠컨텐츠컨텐츠컨텐츠컨텐츠컨텐츠컨텐츠컨텐츠컨텐츠컨텐츠컨텐츠컨텐츠컨텐츠컨텐츠
              </div>
              <button>삭제</button>
              <button>답글</button>
              <button>신고</button>
            </Div>
          </ReComments>

          <ReComments>
            <Image src="" />
            <Div>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                <path d="M1.75 1h12.5c.966 0 1.75.784 1.75 1.75v9.5A1.75 1.75 0 0 1 14.25 14H8.061l-2.574 2.573A1.458 1.458 0 0 1 3 15.543V14H1.75A1.75 1.75 0 0 1 0 12.25v-9.5C0 1.784.784 1 1.75 1ZM1.5 2.75v9.5c0 .138.112.25.25.25h2a.75.75 0 0 1 .75.75v2.19l2.72-2.72a.749.749 0 0 1 .53-.22h6.5a.25.25 0 0 0 .25-.25v-9.5a.25.25 0 0 0-.25-.25H1.75a.25.25 0 0 0-.25.25Z"></path>
                <path d="M22.5 8.75a.25.25 0 0 0-.25-.25h-3.5a.75.75 0 0 1 0-1.5h3.5c.966 0 1.75.784 1.75 1.75v9.5A1.75 1.75 0 0 1 22.25 20H21v1.543a1.457 1.457 0 0 1-2.487 1.03L15.939 20H10.75A1.75 1.75 0 0 1 9 18.25v-1.465a.75.75 0 0 1 1.5 0v1.465c0 .138.112.25.25.25h5.5a.75.75 0 0 1 .53.22l2.72 2.72v-2.19a.75.75 0 0 1 .75-.75h2a.25.25 0 0 0 .25-.25v-9.5Z"></path>
              </svg>
              <span>닉네임</span>
              <span>{commentDate}</span>
              <WriteComment placeholder="댓글을 작성해주세요 . " />
              <button>수정</button>
              <button>취소</button>
            </Div>
          </ReComments>
        </CommentList>
        <Button>목록으로</Button>
      </BoardDetailContainer>
    </>
  );
}
