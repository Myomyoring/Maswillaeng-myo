import * as S from '../styles/PostFooter.style';
import KebabIcon from '../../../statics/svg/kebab_icon';
import ShareIcon from '../../../statics/svg/share_icon';

export default function PostFooterPresenter({ sharePost, children }) {
  return (
    <S.PostFooterStyle>
      <S.PostToolsBox>
        <S.SharePostButton onClick={sharePost}>
          <ShareIcon />
        </S.SharePostButton>
        <KebabIcon />
        {children}
      </S.PostToolsBox>
    </S.PostFooterStyle>
  );
}
