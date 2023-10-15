import { useRef, useState } from 'react';

import { styled } from 'styled-components';
import tw from 'twin.macro';
import AddFileIcon from '../../statics/svg/add_file_icon';

const ImageStyle = styled.div`
  ${tw`
        w-40 h-40
        relative
        mx-auto
        text-center
    `}
`;

const Image = styled.img`
  ${tw`
        w-40 h-40
        rounded-full
        border-solid border-gray border-[1px]
    `}
`;
const AddFileLabel = styled.label`
  ${tw`
        cursor-pointer
    `}
  svg {
    ${tw`
          absolute
          top-32 right-28
      `}
  }
`;

export default function ImageInput({ defaultImg, currentImg, setImage }) {
  const [imgFile, setImgFile] = useState(currentImg ?? '');
  const imgRef = useRef();

  const saveImgFile = async () => {
    const file = imgRef.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImgFile(reader.result);
    };

    const formData = new FormData();
    formData.append('photo', file);

    try {
      const response = await uploadService.uploadImage({ formData });
      setImage(response.data.img);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <ImageStyle>
      <Image src={imgFile ? imgFile : defaultImg} alt="프로필 이미지" />
      <input hidden type="file" id="preview" accept="image/*" onChange={saveImgFile} ref={imgRef} />
      <AddFileLabel htmlFor="preview">
        <AddFileIcon />
      </AddFileLabel>
    </ImageStyle>
  );
}
