import { BlurView } from "expo-blur";
import { Platform, Animated } from "react-native";
import { useRef, useEffect } from "react";
import { COLORS } from "../../constants/theme";

export const PlatformWrapperButton = ({ children, style, blurProps = {}, viewProps = {}, active = false }) => {
	const animatedValue = useRef(new Animated.Value(active ? 1 : 0)).current;

	useEffect(() => {
		Animated.timing(animatedValue, {
			toValue: active ? 1 : 0,
			duration: 150,
			useNativeDriver: false,
		}).start();
	}, [active]);

	const backgroundColorBlur = animatedValue.interpolate({
		inputRange: [0, 1],
		outputRange: ["#ffffff00", "#ffffff"],
	});

	const backgroundColor = animatedValue.interpolate({
		inputRange: [0, 1],
		outputRange: [COLORS.glassButton, "#ffffff"],
	});

	if (Platform.OS === "ios") {
		return (
			<BlurView style={[style, { backgroundColor: COLORS.glassButton }]} blurReductionFactor={4} tint='dark' intensity={100} {...blurProps}>
				<Animated.View style={[style, { backgroundColor: backgroundColorBlur }]}>{children}</Animated.View>
			</BlurView>
		);
	} else {
		return (
			<Animated.View style={[style, { backgroundColor }]} {...viewProps}>
				{children}
			</Animated.View>
		);
	}
};
