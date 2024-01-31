import * as S from './styles/TitleBox.style';

export default function TitleBox({ categories, onChange, category, title }) {
  return (
    <S.TitleBoxStyle>
      <S.CategorySelector name="category" onChange={onChange} value={category}>
        <option value="">카테고리 선택</option>
        {categories.map(
          (category) =>
            category.name !== '' && (
              <option key={category.id} value={category.name}>
                {category.title}
              </option>
            ),
        )}
      </S.CategorySelector>
      <S.TitleInput
        type="text"
        name="title"
        value={title}
        onChange={onChange}
        maxLength="30"
        placeholder="제목을 입력해주세요 (최대 30자)"
      />
    </S.TitleBoxStyle>
  );
}
