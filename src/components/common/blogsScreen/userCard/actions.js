import { View, Image, ScrollView } from "react-native";
import styles from "../styles/userCardStyles";
import { COLORS, SPACING } from "../../../../constants/theme";
import { useEmojiState } from "../../../../hooks/useEmojiState";
import AnimatedButton from "../../../ui/animatedButton";
import Animated, { interpolateColor, useAnimatedStyle, useSharedValue, withTiming, Easing } from "react-native-reanimated";
import { memo, useEffect } from "react";

const Reaction = memo(({ emojis, reaction, emojiImages, handleEmojiClick }) => {
	const colorValue = useSharedValue(emojis[reaction]?.isActive ? 1 : 0);

	const animatedTextStyles = useAnimatedStyle(() => ({
		color: interpolateColor(colorValue.value, [1, 0], [COLORS.black, COLORS.white]),
	}));

	useEffect(() => {
		colorValue.value = withTiming(emojis[reaction]?.isActive ? 1 : 0, {
			duration: 225,
			easing: Easing.ease,
		});
	}, [emojis]);

	return (
		<AnimatedButton active={emojis[reaction]?.isActive} style={styles.reactionButton} onToggle={() => handleEmojiClick(reaction)} haptics>
			<Image style={{ width: 20, height: 20 }} source={emojiImages[reaction]} />
			<Animated.Text style={[styles.reactionButtonText, animatedTextStyles]}>{emojis[reaction]?.count}</Animated.Text>
		</AnimatedButton>
	);
});

const UserCardActions = ({ post }) => {
	const { emojis, handleEmojiClick } = useEmojiState(post);

	// it's just shit, i will move all emojis to cdn soon
	const emojiImages = {
		"0_16": require("../../../../../assets/emojis/0_16.png"),
		"0_29": require("../../../../../assets/emojis/0_29.png"),
		"0_32": require("../../../../../assets/emojis/0_32.png"),
		"0_39": require("../../../../../assets/emojis/0_39.png"),
		"1_29": require("../../../../../assets/emojis/1_29.png"),
		"1_35": require("../../../../../assets/emojis/1_35.png"),
	};

	return (
		<View>
			<ScrollView
				contentContainerStyle={{ gap: SPACING.large, padding: SPACING.large }}
				horizontal
				overScrollMode='never'
				showsHorizontalScrollIndicator={false}
				style={styles.actions}
			>
				<AnimatedButton iconName='message' size={24} />
				<AnimatedButton iconName='smile' size={24} />

				{Object.keys(emojis).map((reaction, index) => (
					<Reaction
						key={index}
						emojis={emojis}
						reaction={reaction}
						index={index}
						handleEmojiClick={reaction => handleEmojiClick(reaction)}
						emojiImages={emojiImages}
					/>
				))}
			</ScrollView>
		</View>
	);
};

export default UserCardActions;
