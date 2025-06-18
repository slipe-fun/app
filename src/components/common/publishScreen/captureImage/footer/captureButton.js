import React, { useRef } from "react";
import { Pressable } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withSpring, interpolateColor, interpolate } from "react-native-reanimated";
import * as Haptics from "expo-haptics";
import { COLORS } from "@constants/theme";
import { styles } from "../styles/captureImageStyles";

export const CaptureButton = ({capturePhoto}) => {
	const bgProgress = useSharedValue(0);
	const borderProgress = useSharedValue(0);
	const paddingProgress = useSharedValue(0);
	const isLongPressRef = useRef(false);
	const timerRef = useRef(null);

	const startCaptureAnimation = () => {
		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
		isLongPressRef.current = true;
		bgProgress.value = withTiming(1, { duration: 250 });
		borderProgress.value = withTiming(1, { duration: 250 });
		paddingProgress.value = withSpring(1, { damping: 17, stiffness: 400 });
	};

	const reverseCaptureAnimation = () => {
		bgProgress.value = withTiming(0, { duration: 250 });
		borderProgress.value = withTiming(0, { duration: 250 });
		paddingProgress.value = withSpring(0, { damping: 17, stiffness: 400 });
	};

	const handlePressIn = () => {
		timerRef.current = setTimeout(() => {
			startCaptureAnimation();
			timerRef.current = null;
		}, 350);
	};

	const handlePressOut = async () => {
		if (timerRef.current) {
			clearTimeout(timerRef.current);
			timerRef.current = null;
			await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
			capturePhoto()
		} else if (isLongPressRef.current) {
			Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
			reverseCaptureAnimation();
			// runOnJS(stopRecording)();
		}
		isLongPressRef.current = false;
	};

	const outerStyle = useAnimatedStyle(() => ({
		padding: interpolate(paddingProgress.value, [0, 1], [6, 18]),
	}));

	const innerStyle = useAnimatedStyle(() => ({
		backgroundColor: interpolateColor(bgProgress.value, [0, 1], [COLORS.white, COLORS.red]),
		borderRadius: interpolate(bgProgress.value, [0, 1], [30, 8]),
	}));

	return (
		<Pressable onPressIn={handlePressIn} onPressOut={handlePressOut}>
			<Animated.View style={[styles.captureButton, outerStyle]}>
				<Animated.View style={[styles.captureButtonInside, innerStyle]} />
			</Animated.View>
		</Pressable>
	);
};
