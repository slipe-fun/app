import { useRef, useCallback } from "react";
import { Animated, Pressable } from "react-native";
import * as Haptics from "expo-haptics";
import { COLORS } from "../../../../../constants/theme";
import { styles } from "../../styles/captureImageStyles";

export const CaptureButton = () => {
	const captureBgColor = useRef(new Animated.Value(0)).current;
	const captureBorderRadius = useRef(new Animated.Value(0)).current;
	const capturePadding = useRef(new Animated.Value(0)).current;
	const captureTimerRef = useRef(null);
	const isLongPressingRef = useRef(false);

	const timingConfig = toValue => ({
		toValue,
		duration: 250,
		useNativeDriver: false,
	});

	const startCaptureAnimation = useCallback(() => {
		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
		isLongPressingRef.current = true;
		Animated.parallel([
			Animated.timing(captureBgColor, timingConfig(1)),
			Animated.timing(captureBorderRadius, timingConfig(1)),
			Animated.spring(capturePadding, { friction: 7, tension: 40, useNativeDriver: false, toValue: 1 }),
		]).start();
		// startRecording();
	}, [captureBgColor, captureBorderRadius, capturePadding]);

	const reverseCaptureAnimation = useCallback(() => {
		Animated.parallel([
			Animated.timing(captureBgColor, timingConfig(0)),
			Animated.timing(captureBorderRadius, timingConfig(0)),
			Animated.spring(capturePadding, { friction: 7, tension: 40, useNativeDriver: false, toValue: 0 }),
		]).start();
	}, [captureBgColor, captureBorderRadius, capturePadding]);

	const handleCapturePressIn = useCallback(() => {
		captureTimerRef.current = setTimeout(() => {
			startCaptureAnimation();
			captureTimerRef.current = null;
		}, 350);
	}, [startCaptureAnimation]);

	const handleCapturePressOut = useCallback(() => {
		if (captureTimerRef.current) {
			clearTimeout(captureTimerRef.current);
			captureTimerRef.current = null;
			Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
			// takePicture();
		} else if (isLongPressingRef.current) {
			Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
			reverseCaptureAnimation();
			// stopRecording();
		}
		isLongPressingRef.current = false;
	}, [reverseCaptureAnimation]);

	const captureButtonAnimatedStyles = {
		padding: capturePadding.interpolate({
			inputRange: [0, 1],
			outputRange: [8, 18],
		}),
	};

	const captureButtonInsideAnimatedStyles = {
		backgroundColor: captureBgColor.interpolate({
			inputRange: [0, 1],
			outputRange: [COLORS.white, COLORS.red],
		}),
		borderRadius: captureBorderRadius.interpolate({
			inputRange: [0, 1],
			outputRange: [30, 8],
		}),
	};

	return (
		<Pressable onPressIn={handleCapturePressIn} onPressOut={handleCapturePressOut}>
			<Animated.View style={[styles.captureButton, captureButtonAnimatedStyles]}>
				<Animated.View style={[styles.captureButtonInside, captureButtonInsideAnimatedStyles]} />
			</Animated.View>
		</Pressable>
	);
};
