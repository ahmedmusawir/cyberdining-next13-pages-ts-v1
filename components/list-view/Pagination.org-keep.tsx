import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

interface PaginationProps {
  currentPage: number;
  totalPageCount: number;
  onPageChange: (page: number) => void;
  pageSize: number;
  totalItemCount: number;
}

const Pagination = ({
  currentPage,
  //   totalPageCount,
  onPageChange,
  pageSize,
  totalItemCount,
}: PaginationProps) => {
  const totalPageCount = 5;
  const canGoPrevious = currentPage > 1;
  const canGoNext = currentPage < totalPageCount;
  const startingItemNumber = (currentPage - 1) * pageSize + 1;
  const endingItemNumber = Math.min(currentPage * pageSize, totalItemCount);
  // <-- Change this to ensure we don't exceed the total count

  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 mt-5">
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{startingItemNumber}</span> to{" "}
            <span className="font-medium">{endingItemNumber}</span> of{" "}
            <span className="font-medium">{totalItemCount}</span> results
          </p>
        </div>
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            {canGoPrevious && (
              <button
                onClick={() => onPageChange(currentPage - 1)}
                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                <span className="sr-only">Previous</span>
                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            )}

            {/* You can loop through the total pages to render page numbers */}
            {[...Array(totalPageCount).keys()].map((pageIndex) => {
              const pageNumber = pageIndex + 1;
              const isActive = pageNumber === currentPage;

              return (
                <button
                  key={pageIndex}
                  onClick={() => onPageChange(pageNumber)}
                  className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                    isActive
                      ? "bg-indigo-600 text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0"
                  }`}
                >
                  {pageNumber}
                </button>
              );
            })}

            {canGoNext && (
              <button
                onClick={() => onPageChange(currentPage + 1)}
                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                <span className="sr-only">Next</span>
                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            )}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
