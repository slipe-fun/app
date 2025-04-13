import { View, Pressable, Platform } from "react-native";
import styles from "../styles/UserCardStyles";
import { GradientBorder } from "../../../ui/GradientBorder";
import { COLORS } from "../../../../constants/Theme";
import { BlurView } from "expo-blur";
import Icon from "../../../ui/Icon";
import { LinearGradient } from "expo-linear-gradient";

const UserCardActions = ({ user, index }) => {
	return (
		<View style={styles.actions}>
			<LinearGradient colors={["rgba(0, 0, 0, 0.32)", "rgba(0, 0, 0, 0)"]} start={{ x: 0.5, y: 1 }} end={{ x: 0.5, y: 0 }} style={styles.gradient} />
			<View style={styles.actionsBlock}>
				<Pressable>
					<GradientBorder borderRadius={32} borderWidth={1}>
						{Platform.OS === "ios" ? (
							<BlurView style={styles.menuButton} blurReductionFactor={4} tint='dark' intensity={100}>
								<Icon icon='message' size={24} color={COLORS.white} />
							</BlurView>
						) : (
							<View style={[styles.menuButton, { backgroundColor: COLORS.glassButton }]}>
								<Icon icon='message' size={24} color={COLORS.white} />
							</View>
						)}
					</GradientBorder>
				</Pressable>
				<Pressable>
					<GradientBorder borderRadius={32} borderWidth={1}>
						{Platform.OS === "ios" ? (
							<BlurView style={styles.menuButton} blurReductionFactor={4} tint='dark' intensity={100}>
								<Icon icon='smile' size={26} color={COLORS.white} />
							</BlurView>
						) : (
							<View style={[styles.menuButton, { backgroundColor: COLORS.glassButton }]}>
								<Icon icon='smile' size={26} color={COLORS.white} />
							</View>
						)}
					</GradientBorder>
				</Pressable>
			</View>
		</View>
	);
};

export default UserCardActions;
