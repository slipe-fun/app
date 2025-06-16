import { useState, useEffect } from "react";
import { api } from "../lib/api";

export default function useFetchUser () {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    async function fetchUser () {      
        try {
            const request = await api.v1.get("/account/info/get");

            setUser(request?.data?.success[0]) 
        } catch (err) {
            setError(err)
        }
    }

    useEffect(() => {
        setError(null);
        setIsLoading(true);
        fetchUser()
        setIsLoading(false);
    }, [])

    return { user, isLoading, error };
}