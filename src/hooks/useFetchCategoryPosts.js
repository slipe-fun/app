import { useEffect, useState } from "react";
import { api } from "../lib/api";

export default function useFetchCategoryPosts (category) {
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);

    async function fetchPosts () {
        const request = await api.v2.get(`/posts/category/${category}?page=${page}`);
        setPosts(prev => [...prev, ...request?.data?.success || []]);
    }

    useEffect(() => {
        fetchPosts()
    }, [page]);

    return { posts, setPage }
}