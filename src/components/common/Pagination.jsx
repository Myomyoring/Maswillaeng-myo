import { useEffect, useState } from 'react';

import { styled } from 'styled-components';
import tw from 'twin.macro';

const PaginationStyle = styled.div`
  ${tw`
      flex justify-center gap-2
      mt-7
      
  `}
`;

const PrevButton = styled.button`
  ${tw``}
`;

const NextButton = styled.button`
  ${tw``}
`;

const PageButton = styled.button`
  ${tw``}
`;

const NumberText = styled.span`
  ${tw`text-lg`}
  ${(props) => (props.className === 'active' ? tw`text-point font-bold` : tw`text-darkgray`)}
`;

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
    <PaginationStyle>
      {numbers.length !== 0 ? (
        <>
          <PrevButton hidden={hidePrevButton}>이전</PrevButton>
          {numbers.map((number) => (
            <PageButton key={number} onClick={() => onPageChange(number)}>
              <NumberText className={currentPage === number ? 'active' : ''}>{number}</NumberText>
            </PageButton>
          ))}
          <NextButton hidden={hideNextButton}>다음</NextButton>
        </>
      ) : null}
    </PaginationStyle>
  );
}
