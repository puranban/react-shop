import React, { useCallback, useEffect, useMemo } from "react";
import { ITEM_PER_PAGE } from "../constants";

interface Props {
  currentPage: number;
  onChangePagination: React.Dispatch<React.SetStateAction<number>>;
  total: number;
}

const Pagination: React.FC<Props> = (props: Props) => {
  const {
    total,
    currentPage,
    onChangePagination,
  } = props;

  const totalPages = useMemo(
    () => Math.ceil(total / ITEM_PER_PAGE),
    [total],
  );

  const handlePreviousPage = useCallback(
    () => onChangePagination((prev) => Math.max(prev - 1, 1)),
    [onChangePagination],
  );

  const handleNextPage = useCallback(
    () => onChangePagination((prev) => Math.min(prev + 1, totalPages)),
    [totalPages, onChangePagination],
  );

  useEffect(
    () => {
      try {
        window.scroll({
          top: 0,
          left: 0,
          behavior: 'smooth',
        });
      } catch (error) {
        // fallback
        window.scrollTo(0, 0);
      }
    },
    [currentPage],
  );

  return (
    <div className="pagination">
      <button
        onClick={handlePreviousPage}
        disabled={currentPage === 1}
        aria-label="Previous Page"
      >
        Previous
      </button>
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={handleNextPage}
        disabled={currentPage === totalPages || totalPages === 0}
        aria-label="Next Page"
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
