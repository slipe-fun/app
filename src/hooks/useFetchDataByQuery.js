import { useEffect, useState } from "react";
import { api } from "../lib/api";

export default function useFetchDataByQuery (query, type) {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        setPage(1);
        setData([]); 
    }, [query])
    
    async function fetchData () {
        const request = await api.v2.get(`/search/${type}?q=${query}&page=${page}`);
        setData(prev => [...prev, ...request?.data]);
    }

    useEffect(() => {
        if (!["users", "posts"].includes(type)) return;
        
        fetchData();
    }, [page])

    return { data, setPage, setData };
}