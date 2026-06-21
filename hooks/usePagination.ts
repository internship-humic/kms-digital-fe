import { useState, useCallback } from "react";

export function usePagination(initialLimit: number = 10) {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(initialLimit);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const setPaginationData = useCallback((total: number, pages: number) => {
    setTotalItems(total);
    setTotalPages(pages);
  }, []);

  const nextPage = () => setPage((p) => Math.min(totalPages, p + 1));
  const prevPage = () => setPage((p) => Math.max(1, p - 1));
  const goToPage = (p: number) => setPage(Math.min(Math.max(1, p), totalPages));

  return {
    page,
    limit,
    setLimit,
    totalItems,
    totalPages,
    setPaginationData,
    nextPage,
    prevPage,
    goToPage,
  };
}
