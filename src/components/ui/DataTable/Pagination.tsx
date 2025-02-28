// ui/DataTable/Pagination.tsx
import { Button } from "@/components/ui/button";
import { useTableDataContext } from "@/contexts/DataTableContext";
import { ApiPaginationResponse } from "@/types/common";
import { useMemo } from "react";

interface PaginationProps {
  onPageChange?: (page: number) => void;
}

export default function Pagination<DataType>({ onPageChange }: PaginationProps) {
  const { data, filter, setFilter } = useTableDataContext<ApiPaginationResponse<DataType>>();
  
  const currentPage = Number(filter.page) || 1;
  const lastPage = data?.last_page || 1;

  const pageNumbers = useMemo(() => {
    const pages = [];
    const maxPagesToShow = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = startPage + maxPagesToShow - 1;

    if (endPage > lastPage) {
      endPage = lastPage;
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  }, [currentPage, lastPage]);

  const handlePageChange = (page: number) => {
    setFilter((prev) => ({ ...prev, page }));
    onPageChange?.(page);
  };

  if (!data || lastPage <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 mt-4">
      <Button
        variant="outline"
        size="sm"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </Button>

      {pageNumbers.map((page) => (
        <Button
          key={page}
          variant={currentPage === page ? "default" : "outline"}
          size="sm"
          onClick={() => handlePageChange(page)}
        >
          {page}
        </Button>
      ))}

      <Button
        variant="outline"
        size="sm"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === lastPage}
      >
        Next
      </Button>

      <div className="ml-4 text-sm text-gray-600">
        Page {currentPage} of {lastPage} (Total: {data?.total || 0})
      </div>
    </div>
  );
}