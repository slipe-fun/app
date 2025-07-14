import { useEffect, useState } from "react";
import { api } from "../lib/api";

export default function useFetchDataByQuery (query, type) {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);

    async function fetchData () {
        const request = await api.v1.get(`/post/search?q=${query}&page=${page}`);
        setData(prev => [...prev, ...request?.data?.success]);
    }

    useEffect(() => {
        if (!["account", "post"].includes(type)) return;
        
        fetchData();
    }, [page])

    return { data, setPage };
}