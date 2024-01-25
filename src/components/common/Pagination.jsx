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
  span {
    ${tw`
    `}
  }
`;

export default function Pagination({ lastPage, hidePrevButton, hideNextButton, onChange }) {
  const [numbers, setNumbers] = useState([]);

  useEffect(() => {
    if (lastPage !== 0) {
      getPageNumber();
    }
  }, [lastPage]);

  const getPageNumber = () => {
    const newNumbers = Array.from({ length: lastPage }, (_, i) => i + 1);
    setNumbers(newNumbers);
  };

  return (
    <PaginationStyle>
      {numbers.length !== 0 ? (
        <>
          <PrevButton hidden={hidePrevButton}>이전</PrevButton>
          {numbers.map((number) => (
            <PageButton key={number} onClick={() => onChange(number)}>
              <span>{number}</span>
            </PageButton>
          ))}
          <NextButton hidden={hideNextButton}>다음</NextButton>
        </>
      ) : null}
    </PaginationStyle>
  );
}
