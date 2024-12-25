export default function getUniqueById(array) {
    const seenIds = new Set();
    return array.filter(item => {
      if (seenIds.has(item.id)) {
        return false;
      }
      seenIds.add(item.id);
      return true;
    });
  }