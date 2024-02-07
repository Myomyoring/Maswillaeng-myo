import styled from 'styled-components';
import tw from 'twin.macro';

export const ModalStyle = styled.div`
  ${tw`
        w-full
        absolute
        flex justify-center items-center
        bg-darkgray bg-opacity-70
        backdrop-blur-[4px]
        text-sm

        tablet:h-screen
    `}
`;

export const ContentsBox = styled.div`
  ${tw`
        bg-main
        
        tablet:h-auto
        mobile:w-3/4 h-3/4 max-w-[840px]
    `}
`;

export const Cap = styled.div`
  ${tw`
        flex
        justify-between items-center
        border-solid border-t-4
        
    `}
`;

export const Title = styled.span`
  ${tw`
        mx-5
    `}
`;

export const CloseButton = styled.button`
  ${tw`
        w-10 h-10
    `}
`;
