import { styles } from "../../styles/captureImageStyles";
import { useEffect, useCallback } from "react";
import { View, Pressable } from "react-native";
import { GradientBorder } from "../../../../ui/gradientBorder";
import { PlatformWrapperButton } from "../../../../ui/platformWrapperButton";
import Icon from "../../../../ui/icon";
import { COLORS } from "../../../../../constants/theme";
import * as Haptics from "expo-haptics";
import Animated, {
	interpolateColor,
	useSharedValue,
	Easing,
	withSpring,
	withTiming,
	useAnimatedProps,
	useAnimatedStyle,
	FadeOutDown,
	FadeInUp,
} from "react-native-reanimated";
import { useDispatch, useSelector } from "react-redux";
import { selectImage, updateCameraState } from "../../../../../reducers/publishScreen";

const AnimatedButton = ({ active = false, iconName, onToggle, size = 26 }) => {
	const animValue = useSharedValue(active ? 1 : 0);
	const scaleValue = useSharedValue(1);

	const iconColorProps = useAnimatedProps(() => {
		return {
			fill: interpolateColor(animValue.value, [0, 1], [COLORS.white, COLORS.black]),
		};
	});

	const buttonScaleStyles = useAnimatedStyle(() => {
		return {
			transform: [{ scale: scaleValue.value }],
		};
	});

	const handlePressIn = () => {
		scaleValue.value = withSpring(1.075, { mass: 2.75, damping: 2.5, stiffness: 125 });
	};

	const handlePressOut = () => {
		scaleValue.value = withSpring(1, { mass: 2.75, damping: 2.5, stiffness: 125 });
		Haptics.selectionAsync();
		onToggle();
	};

	useEffect(() => {
		animValue.value = withTiming(active ? 1 : 0, { duration: 225, easing: Easing.ease });
	}, [active]);

	return (
		<Pressable onPressIn={handlePressIn} onPressOut={handlePressOut}>
			<Animated.View style={buttonScaleStyles}>
				<GradientBorder borderRadius={32} borderWidth={1}>
					<PlatformWrapperButton active={active} style={styles.menuButton}>
						<View>
							<Icon icon={iconName} size={size} animatedProps={iconColorProps} />
						</View>
					</PlatformWrapperButton>
				</GradientBorder>
			</Animated.View>
		</Pressable>
	);
};

export const CaptureImageHeader = ({ torch, mute, setTorch, setMute }) => {
	const toggleTorch = useCallback(() => setTorch(prev => (prev === "on" ? "off" : "on")), [setTorch]);
	const toggleMute = useCallback(() => setMute(prev => !prev), [setMute]);
	const image = useSelector(selectImage);
	const dispatch = useDispatch()

	return (
		<>
			{image === "" ? (
				<Animated.View key='header-1' exiting={FadeOutDown.duration(225)} entering={FadeInUp.duration(225)} style={styles.header}>
					<View style={styles.qualityWrapper}>
						<Pressable>
							<View style={styles.qualityButton} />
						</Pressable>
					</View>

					<AnimatedButton active={torch === "on"} iconName='flashlight' onToggle={toggleTorch} />

					<AnimatedButton active={mute} iconName='audio' onToggle={toggleMute} />
				</Animated.View>
			) : (
				<Animated.View key='header-2' exiting={FadeOutDown.duration(225)} entering={FadeInUp.duration(225)} style={styles.header}>
					<AnimatedButton size={24} iconName='arrowBack' onToggle={() => dispatch(updateCameraState({image: ""}))} />
				</Animated.View>
			)}
		</>
	);
};
