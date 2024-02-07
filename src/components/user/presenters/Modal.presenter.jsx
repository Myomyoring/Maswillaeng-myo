import * as S from '../styles/index';

export default function ModalPresenter({ modalContentsList, modalRef, modalId, setModal }) {
  return (
    <S.ModalStyle>
      <S.ContentsBox>
        {modalContentsList.map((content) =>
          content.id === modalId ? (
            <div key={content.id}>
              <S.Cap ref={modalRef}>
                <S.Title>{content.title}</S.Title>
                <S.CloseButton onClick={() => setModal(false)}>X</S.CloseButton>
              </S.Cap>
              {content.view}
            </div>
          ) : null,
        )}
      </S.ContentsBox>
    </S.ModalStyle>
  );
}
