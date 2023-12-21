import { useRef, useState } from 'react';
import { getDownloadURL } from 'firebase/storage';

import { styled } from 'styled-components';
import tw from 'twin.macro';
import AddFileIcon from '../../statics/svg/add_file_icon';
import { imageService } from '../../services/firebaseService/image.firebase.service';

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
  const [imgView, setImgView] = useState(currentImg ?? '');
  const imgRef = useRef();

  const onChangeImage = async () => {
    const file = imgRef.current.files[0];
    const uploadTask = imageService.uploadImage({ type: 'profile_images', filename: file.name, file });

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      },
      (error) => {
        console.log(error.code);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          imageService.setImage({ filename: file.name, url: downloadURL });
          setImgView(downloadURL);
          setImage(downloadURL);
        });
      },
    );
  };

  return (
    <ImageStyle>
      <Image src={imgView ? imgView : defaultImg} alt="프로필 이미지" />
      <input hidden type="file" id="preview" accept="image/*" onChange={onChangeImage} ref={imgRef} />
      <AddFileLabel htmlFor="preview">
        <AddFileIcon />
      </AddFileLabel>
    </ImageStyle>
  );
}
