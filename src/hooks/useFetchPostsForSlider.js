import { api } from "@lib/api";
import { useState, useEffect } from "react";

export default async function (type) {
    const [data, setData] = useState();
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState();

    async function fetchPosts () {
        if (!["popular", "relevant", "similar"].includes(type)) return setError("Undefined type");
        try {
            const request = await api.v2.get(`/post/${type}`);
            setData(request?.data || []);
        } catch (error) {
            setError(error);
        }
    }

    useEffect(() => {
        setData()
        setError(null);
        setIsLoading(true);
        fetchPosts()
        setIsLoading(false);
    }, [type])

    return { data, isLoading, error };
}