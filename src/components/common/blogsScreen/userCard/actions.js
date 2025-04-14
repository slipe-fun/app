import { View, Pressable, Platform, Image, Text, ScrollView } from "react-native";
import styles from "../styles/userCardStyles";
import { GradientBorder } from "../../../ui/gradientBorder";
import { COLORS, SPACING } from "../../../../constants/theme";
import Icon from "../../../ui/icon";
import { LinearGradient } from "expo-linear-gradient";
import { PlatformWrapperButton } from "../../../ui/platformWrapperButton";

const UserCardActions = ({ user, index }) => {
	return (
		<View>
			<ScrollView contentContainerStyle={{ gap: SPACING.large, padding: SPACING.large }} horizontal showsHorizontalScrollIndicator={false} style={styles.actions}>
				<Pressable>
					<GradientBorder BORDER_RADIUS={32} borderWidth={1}>
						<PlatformWrapperButton style={[styles.menuButton, { width: 48, height: 48 }]}>
							<Icon icon='message' size={28} color={COLORS.white} />
						</PlatformWrapperButton>
					</GradientBorder>
				</Pressable>
				<Pressable>
					<GradientBorder BORDER_RADIUS={32} borderWidth={1}>
						<PlatformWrapperButton style={[styles.menuButton, { width: 48, height: 48 }]}>
							<Icon icon='smile' size={30} color={COLORS.white} />
						</PlatformWrapperButton>
					</GradientBorder>
				</Pressable>
				{[0, 1, 2, 3, 4].map((_, index) => (
					<Pressable key={index}>
						<GradientBorder BORDER_RADIUS={32} borderWidth={1}>
							<PlatformWrapperButton style={[styles.reactionButton, { paddingHorizontal: 20, height: 48 }]}>
								<Image style={{ width: 24, height: 24 }} source={require("../../../../../assets/emojis/0_16.png")} />
								<Text style={styles.reactionButtonText}>5.7K</Text>
							</PlatformWrapperButton>
						</GradientBorder>
					</Pressable>
				))}
			</ScrollView>
		</View>
	);
};

export default UserCardActions;
