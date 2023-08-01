import React from 'react';
import { styled } from 'styled-components';
import tw from 'twin.macro';

const ImageLabel = styled.div`
    ${tw`
    w-full h-28
    bg-[url('https://cdn.pixabay.com/photo/2015/03/30/12/35/mojito-698499_1280.jpg')]
    `}
`;

export default ImageLabel;