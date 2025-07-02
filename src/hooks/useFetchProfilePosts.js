import { useEffect, useState } from "react";
import { api } from "../lib/api";

export default function useFetchProfilePosts(userId, selfUser) {
	const [posts, setPosts] = useState([]);
	const [page, setPage] = useState(1);

	useEffect(() => {
		setPosts([selfUser && { type: "publish" }]);
		setPage(1);
	}, [userId]);

	useEffect(() => {
		const fetchPosts = async () => {
			const res = await api.v1.get(`/post/get?page=${page}&user=${userId}`);
			setPosts(prev => [...prev, ...(res?.data?.success || [])]);
		};

		if (userId) fetchPosts();
	}, [page, userId]);

	return { posts, setPage };
};
