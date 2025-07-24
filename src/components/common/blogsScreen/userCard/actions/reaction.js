import { memo, useEffect } from "react";
import { fastSpring } from "@constants/easings";
import { Text, View, Image, getVariableValue } from "tamagui";
import Animated, { interpolateColor, useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import { getCharEnter, getCharExit } from "@constants/fadeAnimations";
import { GradientBorder } from "@components/ui/gradientBorder";

const AnimatedText = Animated.createAnimatedComponent(Text);
const AnimatedGradientBorder = Animated.createAnimatedComponent(GradientBorder);

const activeColorVar = getVariableValue("$black", "color");
const inActiveColorVar = getVariableValue("$white", "color");
const glassButtonVar = getVariableValue("$glassButtonStatic", "color");

const Reaction = memo(({ emojis, reaction, emojiImages, handleEmojiClick, isActive }) => {
	const colorValue = useSharedValue(0);

	const animatedTextStyles = useAnimatedStyle(() => ({
		color: interpolateColor(colorValue.value, [1, 0], [activeColorVar, inActiveColorVar]),
	}));

	const animatedViewStyle = useAnimatedStyle(() => ({
		backgroundColor: interpolateColor(colorValue.value, [1, 0], [inActiveColorVar, glassButtonVar]),
	}));

	useEffect(() => {
		colorValue.value = withSpring(isActive ? 1 : 0, fastSpring);
	}, [isActive]);

	return (
		<AnimatedGradientBorder
			br='$full'
			ph='$6'
			gap='$3'
			overflow='hidden'
			alignItems='center'
			flexDirection='row'
			style={animatedViewStyle}
			onPress={() => handleEmojiClick(reaction)}
		>
			<Image style={{ width: 20, height: 20 }} source={emojiImages[reaction]} />

			<View flexDirection='row'>
				{String(emojis[reaction]?.count)
					.split("")
					.map((char, i) => (
						<AnimatedText
							key={`${char}-${i}`}
							fz='$2'
							lh='$2'
							style={animatedTextStyles}
							fw='$2'
							color='white'
							entering={getCharEnter(i)}
							exiting={getCharExit(i)}
						>
							{char}
						</AnimatedText>
					))}
			</View>
		</AnimatedGradientBorder>
	);
});

export default Reaction;
