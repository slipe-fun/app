import { styles } from "../styles/captureImageStyles";
import React, { useRef, useEffect, useCallback } from "react";
import { View, Pressable, Animated, Easing } from "react-native";
import { GradientBorder } from "../../../ui/gradientBorder";
import { PlatformWrapperButton } from "../../../ui/platformWrapperButton";
import Icon from "../../../ui/icon";
import { COLORS } from "../../../../constants/theme";
import * as Haptics from "expo-haptics";

const AnimatedButton = ({ active, iconName, onToggle, animValue, scaleValue }) => {
	const iconColor = animValue.interpolate({
		inputRange: [0, 1],
		outputRange: [COLORS.white, COLORS.primary],
	});

	const handlePressIn = useCallback(() => {
		Animated.spring(scaleValue, {
			toValue: 1.075,
			friction: 3,
			tension: 80,
			useNativeDriver: true,
		}).start();
	}, [scaleValue]);

	const handlePressOut = useCallback(() => {
		Animated.spring(scaleValue, {
			toValue: 1,
			friction: 3,
			tension: 80,
			useNativeDriver: true,
		}).start();
		Haptics.selectionAsync();
		onToggle();
	}, [scaleValue, onToggle]);

	return (
		<Pressable onPressIn={handlePressIn} onPressOut={handlePressOut}>
			<Animated.View style={{ transform: [{ scale: scaleValue }] }}>
				<GradientBorder borderRadius={32} borderWidth={1}>
					<PlatformWrapperButton active={active} style={styles.menuButton}>
						<View>
							<Icon icon={iconName} size={26} color={iconColor} />
						</View>
					</PlatformWrapperButton>
				</GradientBorder>
			</Animated.View>
		</Pressable>
	);
};

export const CaptureImageHeader = ({ torch, mute, setTorch, setMute }) => {
	const torchAnim = useRef(new Animated.Value(torch ? 1 : 0)).current;
	const muteAnim = useRef(new Animated.Value(mute ? 1 : 0)).current;
	const torchScale = useRef(new Animated.Value(1)).current;
	const muteScale = useRef(new Animated.Value(1)).current;

	useEffect(() => {
		Animated.timing(torchAnim, {
			toValue: torch ? 1 : 0,
			duration: 225,
			easing: Easing.inOut(Easing.ease),
			useNativeDriver: false,
		}).start();
	}, [torch, torchAnim]);

	useEffect(() => {
		Animated.timing(muteAnim, {
			toValue: mute ? 1 : 0,
			duration: 225,
			easing: Easing.inOut(Easing.ease),
			useNativeDriver: false,
		}).start();
	}, [mute, muteAnim]);

	const toggleTorch = useCallback(() => setTorch(prev => !prev), [setTorch]);
	const toggleMute = useCallback(() => setMute(prev => !prev), [setMute]);

	return (
		<View style={styles.header}>
			<View style={styles.qualityWrapper}>
				<Pressable>
					<View style={styles.qualityButton} />
				</Pressable>
			</View>

			<AnimatedButton active={torch} iconName='flashlight' onToggle={toggleTorch} animValue={torchAnim} scaleValue={torchScale} />

			<AnimatedButton active={mute} iconName='audio' onToggle={toggleMute} animValue={muteAnim} scaleValue={muteScale} />
		</View>
	);
};
