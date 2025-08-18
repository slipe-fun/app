import { useState, useEffect } from "react";
import { api } from "../lib/api";

export default function useFetchUser (id) {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    async function fetchUser () {      
        try {
            const request = await api.v2.get(id ? `/user/${id}` : "/user/by/token");

            setUser(request?.data) 
        } catch (err) {
            setError(err)
        }
    }

    useEffect(() => {
        setError(null);
        setIsLoading(true);
        fetchUser()
        setIsLoading(false);
    }, [id])

    return { user, isLoading, error, setUser };
}