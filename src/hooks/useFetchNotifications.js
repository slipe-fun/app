import { useState, useEffect } from "react";
import { api } from "../lib/api";

const unique = arr => [...new Map(arr.map(item => [item.date, item])).values()];

export function useFetchNotifications() {
    const [notifications, setNotifications] = useState([]);
    const [pages, setPages] = useState([1, 1, 1]);
    const types = ["reaction", "subscribe", "comment"];

    async function fetchNotifications(type) {
        if (!types.includes(type)) return;
        try {
            const request = await api.v1.get(`/notifications/get?page=${pages[types.indexOf(type)]}&type=${type}`);
            const localNotifications = request.data?.success || [];
            if (Object.keys(localNotifications).length === 0) return;
            setNotifications(notifications => unique([...notifications, ...Object.values(localNotifications) || []]));
        } catch (error) {
            console.error("Error fetching notifications:", error);
        }
    }

    function handleFetchNotifications(type) {
        fetchNotifications(type);
    }

    function addPage(type) {
        if (!types.includes(type)) return;
        setPages(pages => {
            const newPages = [...pages];
            newPages[types.indexOf(type)]++;
            return newPages;
        });
    }

    return { notifications, handleFetchNotifications, pages, addPage }
}