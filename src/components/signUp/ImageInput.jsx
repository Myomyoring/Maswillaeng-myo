import React, { useRef, useState } from 'react';
import { styled } from 'styled-components';
import tw from 'twin.macro';
import AddFileIcon from '../../statics/svg/addFileIcon';
import axios from 'axios';

const InputBox = styled.div`
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

export default function ImageInput({ defaultImg, currentImg, image }) {
  const [imgFile, setImgFile] = useState(currentImg ? currentImg : '');
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
      const res = await axios.post('/api/user/upload', formData);
      image(res.data.img);

      console.log(res.data.img);
    } catch (err) {
      console.log('실패', err);
    }
  };

  return (
    <InputBox>
      <Image src={imgFile ? imgFile : defaultImg} alt="프로필 이미지" />
      <Input type="file" id="preview" accept="image/*" onChange={saveImgFile} ref={imgRef} />
      <Label htmlFor="preview">
        <AddFileIcon />
      </Label>
    </InputBox>
  );
}
