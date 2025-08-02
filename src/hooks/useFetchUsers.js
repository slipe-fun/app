import { useState, useEffect } from "react";
import { api } from "../lib/api";

export default function useFetchUsers() {
  const [users, setUsers] = useState([]);

  async function fetchPosts() {
    const allUsersIds = users.map((user) => user.author.id);
    const request = await api.v2.get(
      `/posts?watched=[${allUsersIds}]&days=7&region=slavic`,
    );
    const localUsers = request.data || [];
    setUsers((users) => [...users, ...localUsers]);
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  function handleFetchUsers() {
    fetchPosts();
  }

  return { users, handleFetchUsers };
}
