import styled from 'styled-components';
import { COLOR } from '../../constants/styles/color';
import { SPACING } from '../../constants/styles/spacing';
import { TYPOGRAPHY } from '../../constants/styles/typography';
import { FC } from 'react';

export interface PaginationComponentProps {
  currentPage: number;
  totalPages: number;
  handlePageChange: (newPage: number) => void;
}

const PaginationComponent: FC<PaginationComponentProps> = ({
  currentPage,
  totalPages,
  handlePageChange,
}) => {

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);


  return (
    <Pagination>
      <PaginationButton
        disabled={currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
      >
        Prev
      </PaginationButton>
      {pageNumbers.map((pageNumber) => (
        <PageNumber
          key={pageNumber}
          $isActive={currentPage === pageNumber}
          onClick={() => handlePageChange(pageNumber)}
        >
          {pageNumber}
        </PageNumber>
      ))}
      <PaginationButton
        disabled={currentPage === totalPages}
        onClick={() => handlePageChange(currentPage + 1)}
      >
        Next
      </PaginationButton>
    </Pagination>
  );
};

export default PaginationComponent;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: ${SPACING.s8} 0;
`;

const PaginationButton = styled.button`
  ${TYPOGRAPHY.h6};
  background-color: transparent;
  color: ${COLOR.white};
  border: none;
  border-radius: 4px;
  padding: ${SPACING.s3} ${SPACING.s5};
  margin: 0 ${SPACING.s4};
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:disabled {
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    opacity: 0.8;
  }
`;

const PageInfo = styled.span`
  ${TYPOGRAPHY.bodyRG};
  color: ${COLOR.white};
`;

const PageNumber = styled.button<{ $isActive: boolean }>`
  ${TYPOGRAPHY.h6};
  background-color: ${({ $isActive }) =>
    $isActive ? COLOR.primary : COLOR.input};
  color: ${COLOR.white};
  border: none;
  border-radius: 4px;
  padding: ${SPACING.s3} ${SPACING.s5};
  margin: 0 ${SPACING.s2};
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;

  &:hover:not(:disabled) {
    opacity: 0.8;
  }
`;