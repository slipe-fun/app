import { useState } from "react";
import { Button } from "tamagui";
import Icon from "@components/ui/icon";
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from "react-native-reanimated";
import { normalSpring } from "@constants/easings";
import useCaptureStore from "@stores/captureScreen";
import * as Haptics from "expo-haptics";

const CaptureRotateButton = ({}) => {
	const rotation = useSharedValue(0);
	const [disabled, setDisabled] = useState(false);
	const captureFacing = useCaptureStore((state) => state.facing);
	const setFacing = useCaptureStore((state) => state.setFacing);

	const animatedIconStyles = useAnimatedStyle(() => ({
		transform: [{ rotate: `${rotation.value}deg` }],
	}));

	const handlePress = () => {
		if (disabled) return;
		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
		setFacing(captureFacing === "back" ? "front" : "back");
		rotation.value = withSpring(rotation.value + 180, normalSpring);
		setDisabled(true);

		setTimeout(() => {
			setDisabled(false);
		}, 1000);
	};

	return (
		<Button
			onPress={handlePress}
			disabled={disabled}
			pressStyle={{
				scale: 0.98,
				opacity: 0.9,
			}}
			backgroundColor='$backgroundTransparent'
			unstyled
			br='$full'
			overflow='hidden'
			justifyContent='center'
			alignItems='center'
			w='$13'
			h='$13'
		>
			<Animated.View style={animatedIconStyles}>
				<Icon size={28} icon='arrow.circle' />
			</Animated.View> 
		</Button>
	);
};

export default CaptureRotateButton;
