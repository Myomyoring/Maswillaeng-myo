import React, { useRef, useState } from 'react';
import { styled } from 'styled-components';
import tw from 'twin.macro';
import AddFileIcon from '../../statics/svg/addFileIcon';

const InputBox = styled.div`
  ${tw`
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
const Input = styled.input`
  ${tw`
         hidden
    `}
`;
const Label = styled.label`
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

export default function ImageInput({ image }) {
  const [imgFile, setImgFile] = useState('');
  const imgRef = useRef();

  const saveImgFile = () => {
    const file = imgRef.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImgFile(reader.result);
    };
  };

  return (
    <InputBox>
      <Image src={imgFile ? imgFile : image} alt="프로필 이미지" />
      <Input type="file" id="preview" accept="image/*" onChange={saveImgFile} ref={imgRef} />
      <Label htmlFor="preview">
        <AddFileIcon />
      </Label>
    </InputBox>
  );
}
