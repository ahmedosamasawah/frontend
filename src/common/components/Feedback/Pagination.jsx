const Pagination = ({ currentPage, numOfPages, onChangePage }) => {
  const prevPage = () => {
    let prevPage = currentPage - 1;
    if (prevPage < 1) prevPage = numOfPages;
    onChangePage(prevPage);
  };

  const nextPage = () => {
    let nextPage = currentPage + 1;
    if (nextPage > numOfPages) nextPage = numOfPages;
    onChangePage(nextPage);
  };

  const addPageButton = ({ pageNum, activeClass }) => {
    return (
      <button
        key={pageNum}
        className={`rounded-sm px-3 py-[6px] text-[14px] ${
          activeClass && "bg-[#395875] text-[#fff]"
        }`}
        onClick={() => onChangePage(pageNum)}
      >
        {pageNum}
      </button>
    );
  };

  const renderPageButton = () => {
    const pagesButtons = [];
    // First Page
    pagesButtons.push(
      addPageButton({ pageNum: 1, activeClass: currentPage === 1 }),
    );

    if (currentPage > 3) {
      pagesButtons.push(<span key="dots-1">...</span>);
    }

    if (currentPage !== 1 && currentPage !== 2) {
      pagesButtons.push(
        addPageButton({
          pageNum: currentPage - 1,
          activeClass: false,
        }),
      );
    }

    // current page
    if (currentPage !== 1 && currentPage !== numOfPages) {
      pagesButtons.push(
        addPageButton({
          pageNum: currentPage,
          activeClass: true,
        }),
      );
    }
    if (currentPage !== numOfPages && currentPage !== numOfPages - 1) {
      pagesButtons.push(
        addPageButton({
          pageNum: currentPage + 1,
          activeClass: false,
        }),
      );
    }
    if (currentPage < numOfPages - 2) {
      pagesButtons.push(<span key="dots-2">...</span>);
    }
    pagesButtons.push(
      addPageButton({
        pageNum: numOfPages,
        activeClass: currentPage === numOfPages,
      }),
    );
    return pagesButtons;
  };

  return (
    <div className="flex items-center justify-center text-primary-light-active">
      <div className="flex items-center gap-2">
        <button
          className={`${currentPage === 1 ? "hidden" : ""}`}
          onClick={prevPage}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 18L15 12L9 6"
              stroke="#B2B1B4"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {renderPageButton()}

        <button
          onClick={nextPage}
          className={`${currentPage === numOfPages ? "hidden" : ""}`}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 18L9 12L15 6"
              stroke="#B2B1B4"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Pagination;
