import { useEffect, useState } from 'react';

import * as S from './styles/Pagination.style';

export default function Pagination({ currentPage, lastPage, hidePrevButton, hideNextButton, onChange }) {
  const [numbers, setNumbers] = useState([]);

  const getPageNumber = () => {
    const pageNumbers = Array.from({ length: lastPage }, (_, i) => i + 1);
    setNumbers(pageNumbers);
  };

  const onPageChange = (number) => {
    window.scrollTo(0, 0);
    onChange(number);
  };

  useEffect(() => {
    if (lastPage !== 0) {
      getPageNumber();
    }
  }, [lastPage]);

  return (
    <S.PaginationStyle>
      {numbers.length !== 0 ? (
        <>
          <S.PrevButton hidden={hidePrevButton}>이전</S.PrevButton>
          {numbers.map((number) => (
            <S.PageButton key={number} onClick={() => onPageChange(number)}>
              <S.NumberText className={currentPage === number ? 'active' : ''}>{number}</S.NumberText>
            </S.PageButton>
          ))}
          <S.NextButton hidden={hideNextButton}>다음</S.NextButton>
        </>
      ) : null}
    </S.PaginationStyle>
  );
}
