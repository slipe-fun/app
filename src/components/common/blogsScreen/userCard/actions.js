import { View, Pressable, Platform, Image, Text, ScrollView } from "react-native";
import styles from "../styles/userCardStyles";
import { GradientBorder } from "../../../ui/gradientBorder";
import { COLORS, SPACING } from "../../../../constants/theme";
import Icon from "../../../ui/icon";
import { PlatformWrapperButton } from "../../../ui/platformWrapperButton";
import { useEmojiState } from "../../../../hooks/useEmojiState";

const UserCardActions = ({ post }) => {
	const { emojis, handleEmojiClick } = useEmojiState(post);

	// it's just shit, i will move all emojis to cdn soon
	const emojiImages = {
		'0_16': require('../../../../../assets/emojis/0_16.png'),
		'0_29': require('../../../../../assets/emojis/0_29.png'),
		'0_32': require('../../../../../assets/emojis/0_32.png'),
		'0_39': require('../../../../../assets/emojis/0_39.png'),
		'1_29': require('../../../../../assets/emojis/1_29.png'),
		'1_35': require('../../../../../assets/emojis/1_35.png'),
	};

	return (
		<View>
			<ScrollView
				contentContainerStyle={{ gap: SPACING.large, padding: SPACING.large }}
				horizontal
				overScrollMode="never"
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

				{Object.keys(emojis).map((reaction, index) => (
					<Pressable onPress={() => handleEmojiClick(reaction)} key={index}>
						<GradientBorder borderRadius={32} borderWidth={1}>
							<PlatformWrapperButton style={styles.reactionButton}>
								<Image style={{ width: 22, height: 22 }} source={emojiImages[reaction]} />
								<Text style={styles.reactionButtonText}>{emojis[reaction]?.count}</Text>
							</PlatformWrapperButton>
						</GradientBorder>
					</Pressable>
				))}
			</ScrollView>
		</View>
	);
};

export default UserCardActions;
