import { View, Text, Image, TouchableOpacity } from "react-native";
import styles from "../styles/UserCardStyles";

const UserCard = ({ user, index }) => {
	return (
		<TouchableOpacity style={styles.userCard} activeOpacity={0.9}>
			<Image source={{ uri: user.postImage }} style={styles.postImage} />
			<View style={styles.userInfo}>
				<Text style={styles.userName}>{user.name}</Text>
				<Text style={styles.userStats}>
					{user.followers}M followers • {user.posts} posts
				</Text>
			</View>
		</TouchableOpacity>
	);
};

export default UserCard;