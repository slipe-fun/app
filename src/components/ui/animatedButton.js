import React, { useEffect, useCallback } from "react";
import { View, Pressable } from "react-native";
import Animated, {
	interpolateColor,
	useSharedValue,
	withSpring,
	withTiming,
	useAnimatedProps,
	useAnimatedStyle,
	Easing,
	runOnJS,
} from "react-native-reanimated";
import * as Haptics from "expo-haptics";

import { styles } from "./styles/animatedButtonStyles";
import { GradientBorder } from "./gradientBorder";
import { PlatformWrapperButton } from "./platformWrapperButton";
import Icon from "./icon";
import { COLORS } from "../../constants/theme";

const AnimatedGradientBorder = Animated.createAnimatedComponent(GradientBorder)

const AnimatedButton = ({ active = false, iconName, onToggle, size = 26, style, haptics = false, exiting, entering, children }) => {
	const anim = useSharedValue(active ? 1 : 0);
	const scale = useSharedValue(1);

	const iconColorProps = useAnimatedProps(() => ({
		fill: interpolateColor(anim.value, [0, 1], [COLORS.white, COLORS.black]),
	}));

	const buttonScaleStyle = useAnimatedStyle(() => ({
		transform: [{ scale: scale.value }],
	}));

	useEffect(() => {
		anim.value = withTiming(active ? 1 : 0, {
			duration: 225,
			easing: Easing.ease,
		});
	}, [active, anim]);

	const handlePressIn = useCallback(() => {
		scale.value = withSpring(0.95, {
			mass: 2.75,
			damping: 5,
			stiffness: 125,
		});
	}, [scale]);

	const handlePressOut = useCallback(() => {
		scale.value = withSpring(1, {
			mass: 2.75,
			damping: 5,
			stiffness: 125,
		});
	}, [haptics, scale]);

	const handlePress = useCallback(() => {
		onToggle && runOnJS(onToggle)();
        if (haptics) runOnJS(Haptics.selectionAsync)();
	}, [onToggle]);

	return (
		<Pressable
			delayPressIn={50}
			pressRetentionOffset={{ top: 5, bottom: 5, left: 5, right: 5 }}
			onPressIn={handlePressIn}
			onPressOut={handlePressOut}
			onPress={handlePress}
		>
				<AnimatedGradientBorder entering={entering} exiting={exiting} style={buttonScaleStyle} borderRadius={32} borderWidth={1}>
					<PlatformWrapperButton active={active} style={style || styles.menuButton}>
						{children || (
							<View>
								<Icon icon={iconName} size={size} animatedProps={iconColorProps} />
							</View>
						)}
					</PlatformWrapperButton>
				</AnimatedGradientBorder >
		</Pressable>
	);
};

export default AnimatedButton;
