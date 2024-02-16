import styled from 'styled-components';
import tw from 'twin.macro';

export const PostContentsStyle = styled.div`
  ${tw`
      flex flex-col gap-4
  `}

  .ql-editor {
    ${tw`
          border-solid border-gray border-2
        bg-white

        desktop:min-h-[300px]
        tablet:min-h-[300px]
        mobile:min-h-[100px]
    `}
  }

  a:nth-child(6) {
    ${tw`
        self-end 
        font-[300]
        
        desktop:px-11
        tablet:px-8
        mobile:px-4
      `}
  }
`;
