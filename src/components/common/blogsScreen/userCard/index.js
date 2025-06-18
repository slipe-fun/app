import { View, Image, Pressable } from "react-native";
import { GradientBorder } from "@components/ui/gradientBorder";
import styles from "../styles/userCardStyles";
import UserCardHeader from "./user";
import UserCardActions from "./actions";
import { useState, useEffect } from "react";
import { URLS } from "@constants/urls";
import { useFetchUserPosts } from "@hooks/useFetchUserPosts";

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

	return (
		<GradientBorder
			style={styles.cardContainer}
			borderRadius={14}
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
