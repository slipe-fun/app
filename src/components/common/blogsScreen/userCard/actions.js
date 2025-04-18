import { View, Pressable, Platform, Image, Text, ScrollView } from "react-native";
import styles from "../styles/userCardStyles";
import { GradientBorder } from "../../../ui/gradientBorder";
import { COLORS, SPACING } from "../../../../constants/theme";
import Icon from "../../../ui/icon";
import { PlatformWrapperButton } from "../../../ui/platformWrapperButton";

const UserCardActions = ({ user, index }) => {
	return (
		<View>
			<ScrollView
				contentContainerStyle={{ gap: SPACING.large, padding: SPACING.large }}
				horizontal
				showsHorizontalScrollIndicator={false}
				style={styles.actions}
			>
				<Pressable>
					<GradientBorder borderRadius={32} borderWidth={1}>
						<PlatformWrapperButton style={styles.menuButton}>
							<Icon icon='message' size={26} color={COLORS.white} />
						</PlatformWrapperButton>
					</GradientBorder>
				</Pressable>
				<Pressable>
					<GradientBorder borderRadius={32} borderWidth={1}>
						<PlatformWrapperButton style={styles.menuButton}>
							<Icon icon='smile' size={28} color={COLORS.white} />
						</PlatformWrapperButton>
					</GradientBorder>
				</Pressable>

				{[0, 1, 2, 3, 4].map((_, index) => (
					<Pressable key={index}>
						<GradientBorder borderRadius={32} borderWidth={1}>
							<PlatformWrapperButton style={styles.reactionButton}>
								<Image style={{ width: 22, height: 22 }} source={require("../../../../../assets/emojis/0_16.png")} />
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
