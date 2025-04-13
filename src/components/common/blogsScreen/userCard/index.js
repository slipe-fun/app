import { View, Image, StyleSheet } from "react-native";
import { GradientBorder } from "../../../ui/GradientBorder";
import styles from "../styles/UserCardStyles";
import UserCardHeader from "./User";
import UserCardActions from "./Actions";

const UserCard = ({ user, index }) => {
	return (
		<GradientBorder
			style={styles.cardContainer}
			borderRadius={16}
			gradientColors={["rgba(255, 255, 255, 0.24)", "rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.24)"]}
			borderWidth={1}
		>
			<Image source={{ uri: user.postImage }} style={styles.postImage} />
			<UserCardHeader user={user} />
			<UserCardActions />
		</GradientBorder>
	);
};

export default UserCard;
