export default function handlePageChange(type, localPage, paginationPages, currentPage, setCurrentPage) {
    if (!Array.isArray(paginationPages) || paginationPages.length === 0) return;
    if (currentPage < 0 || currentPage >= paginationPages.length) return;

    if (type === "plus") {
        const nextPage = paginationPages[currentPage + 1];
        if (nextPage && localPage === nextPage[0]-1) {
            setCurrentPage(currentPage + 1);
        }
    } else if (type === "minus") {
        const lastPage = paginationPages[currentPage - 1];
        if (lastPage && localPage === lastPage[lastPage.length-1]) {
            setCurrentPage(currentPage - 1)
        }
    }
}