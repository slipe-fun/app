import React, { useEffect, memo } from "react";
import { Platform } from "react-native";
import Animated, { useSharedValue, withTiming, useAnimatedStyle, interpolateColor } from "react-native-reanimated";
import { BlurView } from "expo-blur";
import { COLORS } from "../../constants/theme";

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);
const AnimatedView = Animated.View;

export const PlatformWrapperButton = memo(({ children, style, blurProps = {}, viewProps = {}, active = false }) => {
	const progress = useSharedValue(active ? 1 : 0);

	useEffect(() => {
		progress.value = withTiming(active ? 1 : 0, { duration: 225 });
	}, [active, progress]);

	const animatedStyle = useAnimatedStyle(() => {
		const bgColor = interpolateColor(progress.value, [0, 1], [COLORS.glassButton, "#ffffff"]);
		const blurBg = interpolateColor(progress.value, [0, 1], ["#00000000", COLORS.iosGlassButton]);

		return Platform.OS === "ios" ? { backgroundColor: blurBg } : { backgroundColor: bgColor };
	});

	const Wrapper = Platform.OS === "ios" ? AnimatedBlurView : AnimatedView;
	const wrapperProps = Platform.OS === "ios" ? { intensity: blurProps.intensity ?? 64, ...blurProps } : viewProps;

	return (
		<Wrapper style={[style, animatedStyle]} {...wrapperProps}>
			{children}
		</Wrapper>
	);
});
