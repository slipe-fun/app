function range(size, startAt = 0) {
    return [...Array(size).keys()].map(i => i + startAt);
}

export default function genPages(totalPosts) {
    const pages = [];
    const total = Number(totalPosts);
    
    for (let i = 0; i < total; i += 6) {
        const remaining = total - i;
        const pageSize = Math.min(6, remaining);
        pages.push(range(pageSize, i));
    }
    
    return pages;
}