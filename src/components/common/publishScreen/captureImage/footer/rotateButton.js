import { useState, useRef, useCallback } from "react";
import { Animated, Pressable } from "react-native";
import * as Haptics from "expo-haptics";
import { GradientBorder } from "../../../../ui/gradientBorder";
import { PlatformWrapperButton } from "../../../../ui/platformWrapperButton";
import Icon from "../../../../ui/icon";
import { COLORS } from "../../../../../constants/theme";
import { styles } from "../../styles/captureImageStyles";

export const RotateButton = ({ applyStaticBlur }) => {
	const [isRotateDisabled, setIsRotateDisabled] = useState(false);
	const rotation = useRef(new Animated.Value(0)).current;
	const scale = useRef(new Animated.Value(1)).current;
	const currentRotation = useRef(0);

	const springConfig = {
		friction: 7,
		tension: 40,
		useNativeDriver: true,
	};

	const changeFacing = useCallback(() => {
		if (isRotateDisabled) return;
		Haptics.selectionAsync();
		setIsRotateDisabled(true);
		applyStaticBlur();
		currentRotation.current += 360;

		Animated.spring(rotation, {
			...springConfig,
			toValue: currentRotation.current,
		}).start(() => {
			setIsRotateDisabled(false);
		});
	}, [isRotateDisabled, rotation, applyStaticBlur]);

	const handleRotatePressIn = useCallback(() => {
		Animated.spring(scale, { ...springConfig, toValue: 1.075 }).start();
	}, [scale]);

	const handleRotatePressOut = useCallback(() => {
		Animated.spring(scale, { ...springConfig, toValue: 1 }).start();
		changeFacing();
	}, [scale, changeFacing]);

	const rotateIconAnimatedStyles = {
		transform: [
			{
				rotate: rotation.interpolate({
					inputRange: [currentRotation.current, currentRotation.current + 360],
					outputRange: ["0deg", "360deg"],
				}),
			},
		],
	};

	const rotateButtonAnimatedStyles = {
		transform: [{ scale }],
	};

	return (
		<Pressable onPressIn={handleRotatePressIn} onPressOut={handleRotatePressOut} disabled={isRotateDisabled}>
			<Animated.View style={rotateButtonAnimatedStyles}>
				<GradientBorder borderRadius={32} borderWidth={1}>
					<PlatformWrapperButton style={styles.menuButton}>
						<Animated.View style={rotateIconAnimatedStyles}>
							<Icon icon='circleArrow' size={28} color={COLORS.white} />
						</Animated.View>
					</PlatformWrapperButton>
				</GradientBorder>
			</Animated.View>
		</Pressable>
	);
};
