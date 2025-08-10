//INTL_DONE

import React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { classNames } from "../utils/smallFunctions";
interface PaginationProps {
  total: number;
  currentPage: number;
  pageSize: number;
  totalItems?: number;
  rowsPerPage?: number[];
  padding?: string; // New add
  border?: string; // New add

  onPageSelected: (selectedPage: number) => void;
  onSetRowsPerPage?: (nbre: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  total,
  currentPage,
  rowsPerPage,
  pageSize,
  // totalItems,
  padding = "p-2.5",
  border = "border border-gray-200",

  onPageSelected,
  onSetRowsPerPage,
}) => {
  const getPagination = (total: number, currentPage: number) => {
    let pages: (number | string)[] = [];

    if (total <= 7) {
      pages = Array.from({ length: total }, (_, index) => index + 1);
    } else {
      const visiblePages = Math.min(5, total - 2);
      const startPages = [1, 2];
      const endPages = [total - 1, total];
      const currentPages = [...Array(visiblePages).keys()]
        .map((x) => x + Math.max(currentPage - Math.floor(visiblePages / 2), 3))
        .filter((x) => x < total - 1);

      if (currentPages[0] > 3) {
        pages = [...startPages, "...", ...currentPages, "...", ...endPages];
      } else if (currentPages[currentPages.length - 1] < total - 2) {
        pages = [...startPages, ...currentPages, "...", ...endPages];
      } else {
        pages = [...startPages, ...currentPages, ...endPages];
      }
    }

    return pages;
  };

  const handlePageClick = (page: number) => {
    if (page >= 1 && page <= total && page !== currentPage) {
      onPageSelected(page);
    }
  };

  const pages = getPagination(total, currentPage);

  return (
    <div
      // className="flex flex-col items-center p-4 justify-between sm:flex-row sm:items-center border border-gray-200 rounded-md"
      className={classNames(
        "flex flex-col items-center justify-between sm:flex-row sm:items-center rounded-md",
        padding,
        border
      )}
    >
      {rowsPerPage && rowsPerPage.length > 0 && (
        <div className="flex items-center space-x-2">
          <label htmlFor="rows-per-page" className="text-gray-700 text-sm">
            Rows per page
            {/* Rows per page: */}
          </label>
          <select
            id="rows-per-page"
            value={pageSize}
            onChange={(e) =>
              onSetRowsPerPage && onSetRowsPerPage(Number(e.target.value))
            }
            className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:ring-indigo-500 focus:border-indigo-500 min-w-16"
          >
            {rowsPerPage.map((rows) => (
              <option key={rows} value={rows}>
                {rows}
              </option>
            ))}
          </select>
        </div>
      )}

      {total > 1 && (
        <div className="flex items-center">
          <div
          // className="flex items-center justify-between border-t border-gray-200 bg-inherit px-4 py-4 sm:px-6"
          >
            <div className="flex flex-1 justify-between sm:hidden">
              <button
                onClick={() => handlePageClick(currentPage - 1)}
                disabled={currentPage === 1}
                className={`relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 ${
                  currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                Previous
              </button>

              <button
                onClick={() => handlePageClick(currentPage + 1)}
                disabled={currentPage === total}
                className={`relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 ${
                  currentPage === total ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                Next{" "}
              </button>
            </div>

            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
              <div>
                {/* <p className="text-sm text-gray-700">
            {t("components.Pagination.showing")}{" "}
            <span className="font-medium">
              {(currentPage - 1) * pageSize + 1}
            </span>{" "}
            {t("components.Pagination.to")}{" "}
            <span className="font-medium">
              {Math.min(currentPage * pageSize, total * pageSize)}
            </span>{" "}
            {t("components.Pagination.of")}{" "}
            <span className="font-medium">
              {totalItems ? totalItems : total * pageSize}
            </span>{" "}
            {t("components.Pagination.results")}{" "}
          </p> */}
              </div>
              <div>
                <nav
                  aria-label="Pagination"
                  className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                >
                  <button
                    onClick={() => handlePageClick(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
                      currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    <span className="sr-only">Previous</span>
                    <ChevronLeftIcon aria-hidden="true" className="h-5 w-5" />
                  </button>
                  {pages.map((page, index) => (
                    <React.Fragment key={index}>
                      {page === "..." ? (
                        <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
                          ...
                        </span>
                      ) : (
                        <button
                          onClick={() => handlePageClick(page as number)}
                          className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                            page === currentPage
                              ? "z-10 bg-indigo-600 text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                              : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                          }`}
                        >
                          {page}
                        </button>
                      )}
                    </React.Fragment>
                  ))}
                  <button
                    onClick={() => handlePageClick(currentPage + 1)}
                    disabled={currentPage === total}
                    className={`relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
                      currentPage === total
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                  >
                    <span className="sr-only">Nexte</span>
                    <ChevronRightIcon aria-hidden="true" className="h-5 w-5" />
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pagination;
