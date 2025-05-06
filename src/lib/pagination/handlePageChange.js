export default function handlePageChange(localPage, paginationPages, currentPage, setCurrentPage) {
    if (!Array.isArray(paginationPages) || paginationPages.length === 0) return;
    if (currentPage < 0 || currentPage >= paginationPages.length) return;

    const currentPagination = paginationPages[currentPage];

    if (!Array.isArray(currentPagination) || currentPagination.length === 0) return;

    if (typeof localPage !== 'number') return;

    if (localPage === currentPagination[0] && currentPage > 0) {
        setCurrentPage(prev => prev - 1);
    }
    else if (
        localPage === currentPagination[currentPagination.length - 1] &&
        currentPage < paginationPages.length - 1
    ) {
        setCurrentPage(prev => prev + 1);
    }
    else {
        const newPageIndex = paginationPages.findIndex(page =>
            page.includes(localPage)
        );
        if (newPageIndex !== -1 && newPageIndex !== currentPage) {
            setCurrentPage(newPageIndex);
        }
    }
}