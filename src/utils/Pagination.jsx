import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import tw from 'twin.macro';

const PaginationStyle = styled.div`
  ${tw`
      flex justify-center
      my-3
  `}

  button {
    ${tw`
        mx-3
    `}
  }
`;

const PrevButton = styled.button`
  ${tw`
  `}
`;

const NextButton = styled.button`
  ${tw`
  `}
`;

const PageButton = styled.button`
  ${tw`
  `}
`;

export default function Pagination({ page, count, hidePrevButton, hideNextButton, onChange }) {
  /*
  page = 현재 몇 페이지 인지
  count = 총 페이지 수
  hidePrevButton = 언제 이전 버튼을 감추는지
  hidePrevButton = 언제 다음 버튼을 감추는지
  */
  const [numbers, setNumbers] = useState([]);

  useEffect(() => {
    if (count !== 0) {
      getPageNumbers();
      console.log(numbers.length);
    }
  }, [count]);

  const getPageNumbers = () => {
    const newNumbers = [];
    // 숫자 생성 후 리스트
    for (let i = 1; i <= count; i++) {
      newNumbers.push(i);
    }
    console.log(numbers.length);
    setNumbers(newNumbers);
  };

  const handlePageClick = (pageNumber) => {
    onChange(pageNumber); // 선택한 페이지 번호를 다른 컴포넌트로 내보냄
  };

  return (
    <PaginationStyle>
      {numbers.length !== 0 ? (
        <>
          <PrevButton hidden={hidePrevButton}>이전</PrevButton>
          {numbers.map((number) => (
            <PageButton key={number} onClick={() => handlePageClick(number)}>
              {number}
            </PageButton>
          ))}
          <NextButton hidden={hideNextButton}>다음</NextButton>
        </>
      ) : (
        '널!'
      )}
    </PaginationStyle>
  );
}
