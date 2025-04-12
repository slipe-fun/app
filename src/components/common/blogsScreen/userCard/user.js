import { View, Text, Image, TouchableOpacity } from "react-native";
import styles from "../styles/UserCardStyles";
import { LinearGradient } from "expo-linear-gradient";
import Indicator from "./Indicators";

const UserCardHeader = ({ user, index }) => {
	return (
		<View style={styles.header}>
			<LinearGradient colors={["rgba(0, 0, 0, 0.32)", "rgba(0, 0, 0, 0)"]} start={{ x: 0.5, y: 0 }} end={{ x: 0.5, y: 1 }} style={styles.gradient} />
			<Indicator count={5} currentIndex={0} />
			<View style={styles.headerBlock}>
				<Image style={styles.headerAvatar} source={user.avatar} />
				<View style={styles.headerInfo}>
					<Text style={styles.infoName}>{user.name}</Text>
					<Text style={styles.infoDescription}>
						{user.date} | {user.views} views
					</Text>
				</View>
				{/*TODO: Add post actions button in SwiftUI style yo*/}
				<Image style={styles.headerAvatar} source={user.avatar} />
			</View>
		</View>
	);
};

export default UserCardHeader;
