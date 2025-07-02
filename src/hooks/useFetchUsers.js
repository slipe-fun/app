import { useState, useEffect } from "react";
import { api } from "../lib/api";

const unique = arr => [...new Map(arr.map(item => [item.author_id, item])).values()];

export default function useFetchUsers() {
	const [users, setUsers] = useState([]);

	async function fetchPosts() {
		const allUsersIds = users.map(user => user.author.id);
		const request = await api.v1.get(`/post/get?after=0&users=[${allUsersIds}]&horizontalCount=6`);
		const localUsers = request.data?.success || [];
		if (Object.keys(localUsers).length === 0) return;
		setUsers(users => unique([...users, ...Object.keys(localUsers).map(user => localUsers[user]) || []]));
	}

	useEffect(() => {
		fetchPosts();
	}, []);

    function handleFetchUsers () {
        fetchPosts();
    }

    return { users, handleFetchUsers };
}