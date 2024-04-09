import React from 'react';
import styles from './Pagination.module.css';

interface PaginationProps {
  cardsPerPage: number;
  totalCards: number;
  currentPage: number;
  onPageChange: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  cardsPerPage,
  totalCards,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalCards / cardsPerPage);
  const maxPageButtons = 5; // 페이지 버튼 최대 개수
  const middlePage = Math.ceil(maxPageButtons / 2);

  let startPage = Math.max(1, currentPage - middlePage + 1);
  let endPage = Math.min(totalPages, startPage + maxPageButtons - 1);
  if (endPage - startPage < maxPageButtons - 1) {
    startPage = Math.max(1, endPage - maxPageButtons + 1);
  }

  const handlePrevClick = () => {
    onPageChange(Math.max(1, currentPage - maxPageButtons));
  };

  const handleNextClick = () => {
    onPageChange(Math.min(totalPages, currentPage + maxPageButtons));
  };

  return (
    <div>
      <ul className={styles.pagination}>
        {currentPage !== 1 && (
          <li>
            <button onClick={() => onPageChange(1)}>First</button>
          </li>
        )}
        {currentPage > maxPageButtons && (
          <li>
            <button onClick={handlePrevClick}>Previous</button>
          </li>
        )}
        {Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index).map(
          pageNumber => (
            <li key={pageNumber}>
              <button
                onClick={() => onPageChange(pageNumber)}
                className={currentPage === pageNumber ? styles.active : ''}
              >
                {pageNumber}
              </button>
            </li>
          )
        )}
        {currentPage < totalPages - maxPageButtons + 1 && (
          <li>
            <button onClick={handleNextClick}>Next</button>
          </li>
        )}
        {currentPage !== totalPages && (
          <li>
            <button onClick={() => onPageChange(totalPages)}>Last</button>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Pagination;
