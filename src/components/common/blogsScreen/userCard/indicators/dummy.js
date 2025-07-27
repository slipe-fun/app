import { View } from "tamagui";
import { memo, useEffect } from "react";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import { quickSpring } from "@constants/easings";

const AnimatedView = Animated.createAnimatedComponent(View);

const DummyIndicator = ({ indicatorWidth, finished, paused }) => {
	const width = useSharedValue(indicatorWidth);
	const opacity = useSharedValue(1);

	const animatedStyle = useAnimatedStyle(() => {
		if (indicatorWidth <= 0) return {};
		return {
			width: width.value,
			opacity: opacity.value,
		};
	}, [paused]);

	useEffect(() => {
		width.value = withSpring(paused ? 0 : indicatorWidth, quickSpring);
		opacity.value = withSpring(paused ? 0 : 1, quickSpring);
	}, [paused]);

	return <AnimatedView style={animatedStyle} h={2} w={indicatorWidth} backgroundColor={finished ? "$white" : "$indicator"} br='$full' />;
};

export default memo(DummyIndicator);
