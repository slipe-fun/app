import { View, Image, Pressable } from "react-native";
import { GradientBorder } from "../../../ui/gradientBorder";
import styles from "../styles/userCardStyles";
import UserCardHeader from "./user";
import UserCardActions from "./actions";
import { useState, useCallback, useMemo, useEffect } from "react";
import { URLS } from "../../../../constants/urls";
import handlePageChange from "../../../../lib/pagination/handlePageChange";
import genPages from "../../../../lib/pagination/genPages";
import { useFetchUserPosts } from "../../../../hooks/useFetchUserPosts";

const UserCard = ({ user, posts, active }) => {
	const { userPosts, fetchPosts } = useFetchUserPosts(user, posts);

	const [idx, setIdx] = useState(0);
	const [postsLength, setPostsLength] = useState(0);
	const [post, setPost] = useState(null);

	const [paginationPages, setPaginationPages] = useState([]);
	const [currentPage, setCurrentPage] = useState(0);

	const goToNext = useCallback(() => {
		setIdx(prevIndex => {
			const nextIndex = prevIndex + 1;
			return nextIndex < postsLength ? nextIndex : prevIndex;
		});
		handlePageChange(idx + 1, paginationPages, currentPage, setCurrentPage);
	}, [idx, postsLength, currentPage, paginationPages]);

	const goToPrevious = useCallback(() => {
		setIdx(prevIndex => {
			const prevInternalIndex = prevIndex - 1;
			return prevInternalIndex >= 0 ? prevInternalIndex : 0;
		});
		handlePageChange(idx - 1, paginationPages, currentPage, setCurrentPage);
	}, [idx, postsLength, currentPage, paginationPages]);

	const handleIndicatorFinish = useCallback(() => {
		if (idx < postsLength - 1) {
			setIdx(prev => prev + 1);
			handlePageChange(idx + 1, paginationPages, currentPage, setCurrentPage);
		}
	}, [idx, postsLength, currentPage, paginationPages, setCurrentPage]);

	useEffect(() => { setPaginationPages(genPages(user?.postsCount) || []) }, [user?.postsCount]);

	useEffect(() => { fetchPosts(); }, [currentPage]);

	useEffect(() => {
		setPostsLength(userPosts.length);
		setPost(userPosts[idx]);
	}, [userPosts, idx]);

	return (
		<GradientBorder
			style={styles.cardContainer}
			borderRadius={20}
			gradientColors={["rgba(255, 255, 255, 0.24)", "rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.24)"]}
			borderWidth={1}
		>
			<Image source={{ uri: URLS.CDN_POSTS_URL + post?.image }} style={styles.postImage} />

			<UserCardHeader pause={!active} handleIndicatorFinish={handleIndicatorFinish} activeIdx={idx} pages={paginationPages} post={post} user={user} page={currentPage} />

			{postsLength > 1 && (
				<View style={styles.buttonsView}>
					<Pressable style={styles.buttonsViewButton} onPress={goToPrevious} />
					<Pressable style={styles.buttonsViewButton} onPress={goToNext} />
				</View>
			)}

			<UserCardActions post={post} />
		</GradientBorder>
	);
};

export default UserCard;
