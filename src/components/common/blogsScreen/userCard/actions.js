import { View, Pressable, Platform, Image, Text } from "react-native";
import styles from "../styles/userCardStyles";
import { GradientBorder } from "../../../ui/gradientBorder";
import { COLORS } from "../../../../constants/theme";
import { BlurView } from "expo-blur";
import Icon from "../../../ui/icon";
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
				{[0,1,2,3,4].map((_, index) => (
					<Pressable key={index}>
					<GradientBorder borderRadius={32} borderWidth={1}>
						{Platform.OS === "ios" ? (
							<BlurView style={styles.reactionButton} blurReductionFactor={4} tint='dark' intensity={100}>
								<Image style={{ width: 22, height: 22 }} source={require('../../../../../assets/emojis/0_16.png')}/>
								<Text style={styles.reactionButtonText}>5.7K</Text>
							</BlurView>
						) : (
							<View style={[styles.reactionButton, { backgroundColor: COLORS.glassButton }]}>
								<Image style={{ width: 22, height: 22 }} source={require('../../../../../assets/emojis/0_16.png')}/>
								<Text style={styles.reactionButtonText}>5.7K</Text>
							</View>
						)}
					</GradientBorder>
				</Pressable>
				))}
				
			</View>
		</View>
	);
};

export default UserCardActions;
