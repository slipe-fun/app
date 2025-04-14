import { View, Image, Pressable } from "react-native";
import { GradientBorder } from "../../../ui/gradientBorder";
import styles from "../styles/userCardStyles";
import UserCardHeader from "./user";
import UserCardActions from "./actions";
import { useState, useCallback } from "react";

const UserCard = ({ user, active }) => {
	const [idx, setIdx] = useState(0);
	const post = user.posts[idx];
	const postsLength = user.posts?.length;

	const goToNext = useCallback(() => {
		setIdx(prevIndex => {
			const nextIndex = prevIndex + 1;
			return nextIndex >= user.posts?.length ? prevIndex : nextIndex;
		});
	}, []);

	const goToPrevious = () => {
		setIdx(prevIndex => {
			const prevInternalIndex = prevIndex - 1;
			return prevInternalIndex < 0 ? 0 : prevInternalIndex;
		});
	};

	const handleIndicatorFinish = () => {
		setIdx(prev => prev + 1);
	};

	return (
		<GradientBorder
			style={styles.cardContainer}
			borderRadius={16}
			gradientColors={["rgba(255, 255, 255, 0.24)", "rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.24)"]}
			borderWidth={1}
		>
			<Image source={{ uri: post?.postImage }} style={styles.postImage} />
			<UserCardHeader pause={active} handleIndicatorFinish={handleIndicatorFinish} activeIdx={idx} total={postsLength} post={post} user={user} />
			<View style={styles.buttonsView}>
				<Pressable style={styles.buttonsViewButton} onPress={() => goToPrevious()} />
				<Pressable style={styles.buttonsViewButton} onPress={() => goToNext()} />
			</View>
			<UserCardActions />
		</GradientBorder>
	);
};

export default UserCard;
