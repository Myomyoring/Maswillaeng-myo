import * as S from './style/ImageDecoration.style';
import DefaultImage from '../../statics/images/default_label_image.jpg';

export default function ImageDecoration() {
  return (
    <S.ImageDecorationStyle>
      <S.Image src={DefaultImage} alt="게시판 장식 이미지" />
    </S.ImageDecorationStyle>
  );
}
