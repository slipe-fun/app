import { useEffect, useState } from "react";
import { api } from "../lib/api";

export default function useFetchSearchHints(query, type) {
  const [data, setData] = useState([]);
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  const isValidType = type === "users" || type === "posts";

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query), 500);
    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    if (!isValidType) return;
    setData([]);

    if (!debouncedQuery) return;

    (async () => {
      try {
        const res = await api.v2.get(`/search/${type}/hints?q=${debouncedQuery}`);
        setData(res?.data || []);
      } catch (e) {
        throw e
      }
    })();
  }, [debouncedQuery, isValidType, type]);

  return { data };
}
