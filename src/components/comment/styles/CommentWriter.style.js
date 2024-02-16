import styled from 'styled-components';
import tw from 'twin.macro';

export const CommentWriterStyle = styled.div`
  ${tw`
      p-5
      flex flex-col gap-3
      bg-lightgray
      border-solid border-gray border-t-[1px] border-b-[1px]
  `}

  button {
    ${tw`
        px-6 self-end
        font-[300]
    `}
  }
`;

export const CommentArea = styled.textarea`
  ${tw`
      w-full
      m-auto p-3
    bg-white
      border-solid border-gray

      desktop:pb-11
      mobile:pb-20
  `}
`;
