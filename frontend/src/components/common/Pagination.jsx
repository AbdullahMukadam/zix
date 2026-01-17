import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const handlePageChange = (page) => {
    onPageChange(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="mt-12 flex items-center justify-center gap-2">
      {/* Previous Button */}
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`p-2 rounded-lg border transition-all ${
          currentPage === 1
            ? 'border-white/5 text-util-gray/30 cursor-not-allowed'
            : 'border-white/10 text-white hover:bg-white/5 hover:border-white/20'
        }`}
        aria-label="Previous page"
      >
        <FiChevronLeft className="w-5 h-5" />
      </button>

      {/* Page Numbers */}
      <div className="flex items-center gap-2">
        {[...Array(totalPages)].map((_, index) => {
          const page = index + 1;
          // Show first, last, current, and adjacent pages
          if (
            page === 1 ||
            page === totalPages ||
            (page >= currentPage - 1 && page <= currentPage + 1)
          ) {
            return (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`min-w-[40px] h-10 rounded-lg border font-bold text-sm transition-all ${
                  currentPage === page
                    ? 'bg-white text-black border-white'
                    : 'border-white/10 text-util-gray hover:text-white hover:bg-white/5 hover:border-white/20'
                }`}
                aria-label={`Page ${page}`}
                aria-current={currentPage === page ? 'page' : undefined}
              >
                {page}
              </button>
            );
          } else if (
            page === currentPage - 2 ||
            page === currentPage + 2
          ) {
            return (
              <span key={page} className="text-util-gray/30 px-1">
                ...
              </span>
            );
          }
          return null;
        })}
      </div>

      {/* Next Button */}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`p-2 rounded-lg border transition-all ${
          currentPage === totalPages
            ? 'border-white/5 text-util-gray/30 cursor-not-allowed'
            : 'border-white/10 text-white hover:bg-white/5 hover:border-white/20'
        }`}
        aria-label="Next page"
      >
        <FiChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
};

export default Pagination;
