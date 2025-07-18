import { useState, useEffect } from "react";
import { api } from "../lib/api";

const unique = arr => [...new Map(arr.map(item => [item.date, item])).values()];

export default function useFetchNotifications() {
    const [notifications, setNotifications] = useState([]);
    const [page, setPage] = useState(1);

    async function fetchNotifications() {
        try {
            const request = await api.v1.get(`/notifications/get?page=${page}&type=all`);
            const localNotifications = request.data?.success || [];
            if (Object.keys(localNotifications).length === 0) return;
            setNotifications(notifications => unique([...notifications, ...Object.values(localNotifications) || []]));
        } catch (error) {
            throw error
        }
    }

    function refresh () {
        setNotifications([]);
        setPage(1);
    }

    function addPage() {
        setPage(page => page + 1);
    }

    useEffect(() => {
        fetchNotifications();
    }, [page])

    return { notifications, page, addPage, refresh }
}