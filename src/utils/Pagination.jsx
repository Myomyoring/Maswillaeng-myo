import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import tw from 'twin.macro';

const PaginationStyle = styled.div`
  ${tw`
      flex justify-center
  `}
`;

const PrevButton = styled.button`
  ${tw`
  `}
`;

const NextButton = styled.button`
  ${tw`
  `}
`;

const pageButton = styled.button`
  ${tw`
  `}
`;

export default function Pagination({ size, page, count, hidePrevButton, hideNextButton }) {
  /*
  size = ui 크기
  page = 현재 몇 페이지 인지
  count = 총 페이지 수
  hidePrevButton = 언제 이전 버튼을 감추는지
  hidePrevButton = 언제 다음 버튼을 감추는지
  */
  const numbers = [];

  useEffect(() => {
    getPageNumbers();
  }, []);

  const getPageNumbers = () => {
    // 숫자 생성 후 리스트
    for (let i = 1; i <= count; i++) {
      numbers.push(i);
    }
    console.log(numbers);
  };
  return (
    <PaginationStyle>
      <PrevButton hidden={hidePrevButton}>이전</PrevButton>
      {numbers.map((number) => (
        <pageButton key={number}>{number}</pageButton>
      ))}
      <NextButton hidden={hideNextButton}>다음</NextButton>
    </PaginationStyle>
  );
}
