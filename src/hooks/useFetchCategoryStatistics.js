import { useEffect, useState } from "react";
import { api } from "@lib/api";

export default function () {
    const [statistics, setStatistics] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    async function fetchStatistics () {      
        try {
            const request = await api.v2.get("/categories");

            setStatistics(request?.data);
        } catch (err) {
            setError(err);
        }
    }

    useEffect(() => {
        setError(null);
        setIsLoading(true);
        fetchStatistics()
        setIsLoading(false);
    }, [])

    return { statistics, isLoading, error };
}