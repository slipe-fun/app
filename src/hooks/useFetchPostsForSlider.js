import { api } from "@lib/api";
import { useState, useEffect } from "react";

export default function useFetchPostsForSlider (type) {
    const [data, setData] = useState([]);
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState();

    async function fetchPosts () {
        if (!["popular", "relevant", "similar"].includes(type)) return setError("Undefined type");
        try {
            const request = await api.v2.get(`/posts/${type}`);
            setData(request?.data || []);
        } catch (error) {
            setError(error);
        }
    }

    useEffect(() => {
        setError(null);
        setIsLoading(true);
        fetchPosts()
        setIsLoading(false);
    }, [type])

    return { data, isLoading, error, setData };
}