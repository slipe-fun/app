import { styles } from "../styles/captureImageStyles";
import { useCallback } from "react";
import AnimatedButton from "../../../../ui/animatedButton";
import { useSelector } from "react-redux";
import Animated, { FadeInDown, FadeOutUp } from "react-native-reanimated";
import { selectImage } from "../../../../../reducers/publishScreen";

export const CaptureImageHeader = ({ torch, mute, setTorch, setMute }) => {
	const toggleTorch = useCallback(() => setTorch(prev => (prev === "on" ? "off" : "on")), [setTorch]);
	const toggleMute = useCallback(() => setMute(prev => !prev), [setMute]);
	const image = useSelector(selectImage);

	return (
		<>
			{image === "" && (
				<Animated.View exiting={FadeOutUp.duration(250)}
				entering={FadeInDown.duration(250)} key='header-1' style={styles.header}>
					<AnimatedButton haptics active={torch === "on"} iconName='flashlight' onToggle={toggleTorch} />
					<AnimatedButton haptics active={mute} iconName='audio' onToggle={toggleMute} />
				</Animated.View>
			
			)}
		</>
	);
};
