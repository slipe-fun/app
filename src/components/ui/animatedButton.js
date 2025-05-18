import { styles } from "./styles/animatedButtonStyles"
import { useEffect } from "react";
import { View, Pressable } from "react-native";
import { GradientBorder } from "./gradientBorder";
import { PlatformWrapperButton } from "./platformWrapperButton";
import Icon from "./icon"
import { COLORS } from "../../constants/theme";
import * as Haptics from "expo-haptics";
import Animated, {
	interpolateColor,
	useSharedValue,
	Easing,
	withSpring,
	withTiming,
	useAnimatedProps,
	useAnimatedStyle,
	ZoomIn,
	ZoomOut,
} from "react-native-reanimated";

const AnimatedButton = ({ active = false, iconName, onToggle, size = 26, style, haptics, exiting, entering }) => {
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
		scaleValue.value = withSpring(0.925, { mass: 2.75, damping: 2.5, stiffness: 125 });
	};

	const handlePressOut = () => {
		scaleValue.value = withSpring(1, { mass: 2.75, damping: 2.5, stiffness: 125 });
		haptics && Haptics.selectionAsync();
		onToggle();
	};

	useEffect(() => {
		animValue.value = withTiming(active ? 1 : 0, { duration: 225, easing: Easing.ease });
	}, [active]);

	return (
		<Pressable onPressIn={handlePressIn} onPressOut={handlePressOut}>
			<Animated.View entering={entering} exiting={exiting} style={buttonScaleStyles}>
				<GradientBorder borderRadius={32} borderWidth={1}>
					<PlatformWrapperButton active={active} style={style || styles.menuButton}>
						<View>
							<Icon icon={iconName} size={size} animatedProps={iconColorProps} />
						</View>
					</PlatformWrapperButton>
				</GradientBorder>
			</Animated.View>
		</Pressable>
	);
};

export default AnimatedButton