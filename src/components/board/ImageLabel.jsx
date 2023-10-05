import { styled } from 'styled-components';
import tw from 'twin.macro';

const ImageLabelStyle = styled.div`
  ${tw`
        w-full h-28
        bg-[url('/src/statics/images/default_label_image.jpg')]
        bg-cover
    `}
`;

export default function ImageLabel() {
  return <ImageLabelStyle />;
}
