export const getCategoryStats = (statistics, categoryName) => {
    const key = categoryName?.toLowerCase();
    const entry = statistics?.find((item) => item?.category === key);
  
    return {
      topNumber: entry ? statistics.indexOf(entry) + 1 : 16,
      postCount: entry?.post_count ?? 0,
    };
  };
  