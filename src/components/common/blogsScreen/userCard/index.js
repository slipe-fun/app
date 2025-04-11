import { View, Text, Image, TouchableOpacity } from "react-native";
import styles from "../styles/UserCardStyles";

const UserCard = ({ user, index }) => {
	return (
		<TouchableOpacity style={styles.userCard} activeOpacity={0.9}>
			<Image source={ user.postImage } style={styles.postImage} />
		</TouchableOpacity>
	);
};

export default UserCard;