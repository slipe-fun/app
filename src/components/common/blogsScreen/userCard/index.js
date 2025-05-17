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

const UserCard = ({ user, posts, active, usersNavigation, goToNext, goToPrevious }) => {
	const { userPosts, fetchPosts } = useFetchUserPosts(user, posts);

	const [postsLength, setPostsLength] = useState(0);
	const [idx, setIdx] = useState(0);
	const [currentPage, setCurrentPage] = useState(0);

	const changeUser = (user) => {
		setIdx(user?.idx)
		setCurrentPage(user?.currentPage)
	}

	const getNavigationUser = () => usersNavigation.find(_user => _user.id === user.id);

	function handleIndicatorFinish () {
		goToNext(user?.id, changeUser);
	}

	useEffect(() => { fetchPosts(); }, [getNavigationUser(user?.id)?.currentPage]);

	useEffect(() => {
		setPostsLength(userPosts.length);
	}, [userPosts]);

	// useEffect(() => console.log(idx, currentPage), [idx, currentPage])

	return (
		<GradientBorder
			style={styles.cardContainer}
			borderRadius={20}
			gradientColors={["rgba(255, 255, 255, 0.24)", "rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.24)"]}
			borderWidth={1}
		>
			<Image source={{ uri: URLS.CDN_POSTS_URL + userPosts[idx]?.image }} style={styles.postImage} />

			<UserCardHeader
				pause={!active}
				handleIndicatorFinish={handleIndicatorFinish}
				activeIdx={idx}
				pages={getNavigationUser(user?.id)?.paginationPages}
				post={userPosts[idx]}
				user={user}
				page={currentPage}
			/>

			{postsLength > 1 && (
				<View style={styles.buttonsView}>
					<Pressable style={styles.buttonsViewButton} onPress={() => {goToPrevious(user?.id, changeUser)}} />
					<Pressable style={styles.buttonsViewButton} onPress={() => {goToNext(user?.id, changeUser)}} />
				</View>
			)}

			<UserCardActions post={userPosts[idx]} />
		</GradientBorder>
	);
};

export default UserCard;
