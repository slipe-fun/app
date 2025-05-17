export default function handlePageChange(localPage, paginationPages, currentPage, setCurrentPage) {
    if (!Array.isArray(paginationPages) || paginationPages.length === 0) return;
    if (currentPage < 0 || currentPage >= paginationPages.length) return;

    setCurrentPage(paginationPages.indexOf(paginationPages.find(page => page.includes(localPage))));
}