import styled from 'styled-components';
import tw from 'twin.macro';

export const EditorStyle = styled.div`
  ${tw`
     py-3
  `}

  .ql-editor {
    ${tw`
        desktop:h-96
        tablet:h-[600px]
        mobile:h-[340px]
      `}
  }
`;
