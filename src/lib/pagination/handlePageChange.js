export default function handlePageChange(localPage, paginationPages, currentPage, setCurrentPage) {
    if (!Array.isArray(paginationPages) || paginationPages.length === 0) return;
    if (currentPage < 0 || currentPage >= paginationPages.length) return;

    const lp = paginationPages[currentPage];
    if (localPage === lp[lp.length-1] && currentPage < paginationPages.length) {
        console.log(321)
        setCurrentPage(currentPage + 1)
    } else if (localPage === lp[0] && currentPage !== 0) {
        console.log(123)
        setCurrentPage(currentPage - 1)
    }
    // setCurrentPage(paginationPages.indexOf(paginationPages.find(page => page.includes(localPage))));
}