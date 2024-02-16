import styled from 'styled-components';
import tw from 'twin.macro';

export const CommentListStyle = styled.div`
  ${tw`
      mb-3
      text-sm
    `}
`;

export const Count = styled.div`
  ${tw`
      py-5 
      font-semibold text-lg
    `}
`;

export const CountHighlightText = styled.span`
  ${tw`
      text-point
    `}
`;

export const Comments = styled.div`
  ${tw`
      p-6
      flex items-center
      bg-white
      border-t-[0.7px] border-solid
  `}
`;

export const ProfileImage = styled.img`
  ${tw`
    w-10 h-10
    mr-6
    border-solid border-gray border-2
    rounded-full object-cover
    `}
`;

export const CommentContent = styled.div`
  ${tw`
      w-full
      flex flex-col gap-2
  `}
`;

export const WriteComment = styled.textarea`
  ${tw`
        w-full
        p-3
        block
        bg-white
        border-solid border-gray
    `}
`;

export const CommentInfoBox = styled.div`
  ${tw`
      flex items-center gap-2
    `}
`;

export const NickNameText = styled.span`
  ${tw`font-bold`}
`;

export const DateText = styled.span`
  ${tw`font-bold`}
`;

export const ContentBox = styled.div`
  ${tw`text-darkgray`}
`;

export const ButtonBox = styled.div`
  ${tw`flex gap-2`}
`;

export const Button = styled.button`
  ${tw`p-0`}
`;
