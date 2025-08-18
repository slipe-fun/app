import { useEffect, useState } from "react";
import { api } from "../lib/api";

export default function useFetchProfilePosts(userId, selfUser) {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  useEffect(() => {
    setPosts([]);
    setPage(1);
  }, [userId]);

  useEffect(() => {
    if (!userId) return;

    const fetchPosts = async () => {
      const res = await api.v1.get(`/post/get?page=${page}&user=${userId}`);
      const newPosts = res?.data?.success || [];

      if (page === 1) {
        const initialItem = selfUser
          ? [{ type: "publish", id: "publish-button" }]
          : [];
        setPosts([...initialItem, ...newPosts]);
      } else {
        setPosts((prev) => [...prev, ...newPosts]);
      }
    };

    fetchPosts();
  }, [page, userId]);

  return { posts, setPage, setPosts };
}
