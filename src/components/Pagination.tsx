import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage } from "@/redux/paginationSlice";
import { RootState } from "@/redux/store";

const Pagination: React.FC = () => {
  const dispatch = useDispatch();
  const { totalPages, currentPage } = useSelector((state: RootState) => state.pagination);

  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 7;

    if (totalPages > maxPagesToShow) {
      if (currentPage <= 4) {
        for (let i = 1; i <= 7; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage > totalPages - 4) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 6; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 3; i <= currentPage + 3; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      }
    } else {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    }
    return pages;
  };

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  return (
    <div className="flex justify-center mt-6">
      <div className="inline-flex items-center space-x-2">
        {getPageNumbers().map((page, index) => (
          <button
            key={index}
            className={`px-4 py-2 text-sm font-semibold rounded-md ${
              page === currentPage ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => typeof page === "number" && handlePageChange(page)}
            disabled={page === currentPage}
          >
            {page === "..." ? "..." : page}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Pagination;

