import { useState, useMemo } from "react";

export function usePagination<T>(data: T[], itemsPerPage: number = 5) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / itemsPerPage) || 1;

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return data.slice(start, start + itemsPerPage);
  }, [currentPage, itemsPerPage, data]);

  const nextPage = () => setCurrentPage((p) => Math.min(totalPages, p + 1));
  const prevPage = () => setCurrentPage((p) => Math.max(1, p - 1));
  const goToPage = (page: number) =>
    setCurrentPage(Math.min(Math.max(1, page), totalPages));

  return {
    currentPage,
    totalPages,
    paginatedData,
    nextPage,
    prevPage,
    goToPage,
    totalItems: data.length,
    itemsPerPage,
  };
}
