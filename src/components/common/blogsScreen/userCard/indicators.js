import { View, XStack } from "tamagui";
import { COLORS } from "@constants/theme";
import { useEffect } from "react";
import Animated, { Easing, interpolateColor, runOnJS, useAnimatedStyle, useSharedValue, withTiming, withRepeat } from "react-native-reanimated";

const AnimatedView = Animated.createAnimatedComponent(View);

const Indicator = ({ index, isFinished, isPaused, onFinished, duration, currentIndex, postsLength }) => {
	const bgProgress = useSharedValue(isFinished ? 1 : 0);
	const widthProgress = useSharedValue(isFinished ? 1 : 0);

	const animatedBgStyle = useAnimatedStyle(() => ({
		backgroundColor: interpolateColor(bgProgress.value, [0, 1], [COLORS.indicator, COLORS.white]),
	}));

	const animatedWidthStyle = useAnimatedStyle(() => ({
		width: `${widthProgress.value * 100}%`,
	}));

	useEffect(() => {
		const timingConfig = { duration, easing: Easing.linear };

		if (!isPaused) {
			if (index === postsLength - 1) {
				widthProgress.value = withRepeat(withTiming(1, timingConfig), -1, false);
			} else {
				widthProgress.value = withTiming(1, timingConfig, finished => {
					"worklet";
					if (finished) runOnJS(onFinished)();
				});
			}
		} else {
			widthProgress.value = 0;
		}
	}, [isPaused, isFinished, currentIndex, duration]);

	useEffect(() => {
		bgProgress.value = withTiming(isFinished ? 1 : 0, { duration: 300 });
	}, [isFinished]);

	return (
		<AnimatedView h={2} f={1} backgroundColor="$indicator" br="$full" style={animatedBgStyle}>
			<AnimatedView f={1} h="$full" br="$full" backgroundColor="$white" style={animatedWidthStyle} />
		</AnimatedView>
	);
};

const Indicators = ({ isPaused = true, currentIndex = 0, postsLength, onFinish, userId, duration = 5.5 }) => {
	return (
		<XStack w="$full" gap="$2">
			{Array(postsLength)
				.fill()
				.map((_, index) => (
					<Indicator
						key={`${userId}-${index}`}
						index={index}
						duration={duration * 1000}
						postsLength={postsLength}
						currentIndex={currentIndex}
						onFinished={onFinish}
						isPaused={isPaused || currentIndex !== index}
						isFinished={index < currentIndex}
					/>
				))}
		</XStack>
	);
};

export default Indicators;
