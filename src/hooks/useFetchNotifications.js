import { useState, useEffect } from "react";
import { api } from "../lib/api";

export default function useFetchNotifications() {
    const [notifications, setNotifications] = useState([]);
    const [afterDay, setAfterDay] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
    const [count, setCount] = useState(0);

    async function fetchNotifications(customAfterDay) {
        setLoading(true);
        try {
            const request = await api.v2.get(`/notifications?after_day=${typeof customAfterDay === "string" ? customAfterDay : afterDay}`);
            const localNotifications = request.data || [];
            if (Object.keys(localNotifications).length === 0) return;
            setCount(localNotifications?.count)
            setNotifications(notifications => [...notifications, ...Object.values(localNotifications?.success) || []]);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setError(error?.response?.data);
            throw error
        }
    }

    function refresh () {
        setNotifications([]);
        setAfterDay("")
        fetchNotifications("");
    }

    function addPage() {
        try {
            const lastNotificationDate = notifications[notifications?.length - 1];
            const lastDay = Object.keys(lastNotificationDate)[0];
            if (lastDay) setAfterDay(lastDay);
        } catch {}
    }

    useEffect(() => {
        fetchNotifications();
        addPage();
    }, [afterDay]);

    return { notifications, error, addPage, refresh, loading, count }
}