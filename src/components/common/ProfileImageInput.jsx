import { useRef, useState } from 'react';
import { getDownloadURL } from 'firebase/storage';

import { imageService } from '../../services/firebaseService/image.firebase.service';

import * as S from '../common/styles/ProfileImageInput.style';
import AddFileIcon from '../../statics/svg/add_file_icon';

export default function ProfileImageInput({ defaultImage, currentImage, setImage, userId }) {
  const [preview, setPreview] = useState(currentImage ?? '');
  const imageRef = useRef();

  const onChange = async () => {
    const file = imageRef.current.files[0];
    const uploadTask = await imageService.uploadImage({ type: 'profile_images', fileName: userId ?? 'null', file });
    const url = await getDownloadURL(uploadTask.ref);
    setPreview(url);
    userId ? setImage(url) : setImage(file);
  };

  return (
    <S.ProfileImageInputStyle>
      <S.Image src={preview ? preview : defaultImage} alt="프로필 이미지" />
      <S.Input hidden type="file" id="preview" accept="image/*" onChange={onChange} ref={imageRef} />
      <S.AddFileLabel htmlFor="preview">
        <AddFileIcon />
      </S.AddFileLabel>
    </S.ProfileImageInputStyle>
  );
}
