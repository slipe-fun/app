import { View, Image, StyleSheet } from "react-native";
import { GradientBorder } from "../../../ui/gradientBorder";
import styles from "../styles/userCardStyles";
import UserCardHeader from "./user";
import UserCardActions from "./actions";
import { useState } from "react";

const UserCard = ({ user, active }) => {
	const [idx, setIdx] = useState(0);
	return (
		<GradientBorder
			style={styles.cardContainer}
			BORDER_RADIUS={16}
			gradientColors={["rgba(255, 255, 255, 0.24)", "rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.24)"]}
			borderWidth={1}
		>
			<Image source={{ uri: user.posts[idx]?.postImage }} style={styles.postImage} />
			<UserCardHeader pause={active} setIdx={setIdx} activeIdx={idx} total={user.posts?.length} post={user.posts[idx]} user={user} />
			<UserCardActions />
		</GradientBorder>
	);
};

export default UserCard;
