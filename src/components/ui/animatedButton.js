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
} from "react-native-reanimated";
import * as Haptics from "expo-haptics";

import { styles } from "./styles/animatedButtonStyles";
import { GradientBorder } from "./gradientBorder";
import { PlatformWrapperButton } from "./platformWrapperButton";
import Icon from "./icon";
import { COLORS } from "../../constants/theme";

const AnimatedButton = ({ active = false, iconName, onToggle, size = 26, style, haptics = false, exiting, entering, children }) => {
	const animValue = useSharedValue(active ? 1 : 0);
	const scaleValue = useSharedValue(1);

	const iconColorProps = useAnimatedProps(() => ({
		fill: interpolateColor(animValue.value, [0, 1], [COLORS.white, COLORS.black]),
	}));

	const buttonScaleStyle = useAnimatedStyle(() => ({
		transform: [{ scale: scaleValue.value }],
	}));

	useEffect(() => {
		animValue.value = withTiming(active ? 1 : 0, {
			duration: 225,
			easing: Easing.ease,
		});
	}, [active, animValue]);

	const handlePressIn = useCallback(() => {
		scaleValue.value = withSpring(0.925, {
			mass: 2.75,
			damping: 2.5,
			stiffness: 125,
		});
	}, [scaleValue]);

	const handlePressOut = useCallback(() => {
		scaleValue.value = withSpring(1, {
			mass: 2.75,
			damping: 2.5,
			stiffness: 125,
		});
	}, [haptics, scaleValue]);

	const handlePress = useCallback(() => {
		onToggle && onToggle();
        if (haptics) Haptics.selectionAsync();
	}, [onToggle]);

	return (
		<Pressable
			delayPressIn={50}
			pressRetentionOffset={{ top: 5, bottom: 5, left: 5, right: 5 }}
			onPressIn={handlePressIn}
			onPressOut={handlePressOut}
			onPress={handlePress}
		>
			<Animated.View entering={entering} exiting={exiting} style={buttonScaleStyle}>
				<GradientBorder borderRadius={32} borderWidth={1}>
					<PlatformWrapperButton active={active} style={style || styles.menuButton}>
						{children || (
							<View>
								<Icon icon={iconName} size={size} animatedProps={iconColorProps} />
							</View>
						)}
					</PlatformWrapperButton>
				</GradientBorder>
			</Animated.View>
		</Pressable>
	);
};

export default AnimatedButton;
