import { useEffect, useState } from "react";
import genPages from "../lib/pagination/genPages";
import handlePageChange from "../lib/pagination/handlePageChange";

export default function usePostNavigation (startDataUsers) {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        setUsers(startDataUsers.map(user => {
            return {
                id: user?.author?.id,
                idx: 0,
                paginationPages: genPages(user?.author?.postsCount),
                currentPage: 0,
                postsCount: user?.author?.postsCount
            }
        }))
    }, [startDataUsers])

    function findUser (userId) {
        return users?.find(user => user.id === userId);
    }

    function changeUserIndex (userId, value) {
        const user = findUser(userId);
        const index = users.indexOf(user);
        setUsers(prev => {
            prev[index].idx = value;
            return prev;
        })
    }

    function changeUserCurrentPage (userId, value) {
        const user = findUser(userId);
        const index = users.indexOf(user);
        setUsers(prev => {
            prev[index].currentPage = value;
            return prev;
        });
    }

    function goToNext(userId, onChange) {
        const user = findUser(userId);
        const nextIndex = user?.idx + 1;
        if (nextIndex >= user?.postsCount) return;
        changeUserIndex(userId, nextIndex)
        handlePageChange("plus", nextIndex, user.paginationPages, user.currentPage, (value) => changeUserCurrentPage(userId, value))
        const newUserData = findUser(userId);
        onChange(newUserData);
        return newUserData;
    }

    function goToPrevious (userId, onChange) {
        const user = findUser(userId);
        const prevIndex = user?.idx - 1;
        if (prevIndex < 0) return;
        changeUserIndex(userId, prevIndex)
        handlePageChange("minus", prevIndex, user.paginationPages, user.currentPage, (value) => changeUserCurrentPage(userId, value))
        const newUserData = findUser(userId);
        onChange(newUserData);
        return newUserData;
    }

    return { users, goToNext, goToPrevious };
}