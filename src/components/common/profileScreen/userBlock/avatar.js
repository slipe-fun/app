import FastImage from "react-native-fast-image";
import { useState } from "react";
import { Blurhash } from "react-native-blurhash";
import Animated, { useAnimatedStyle, withSpring, interpolate } from "react-native-reanimated";
import { URLS } from "@constants/urls";
import { BlurView } from "expo-blur";

const AnimatedFastImage = Animated.createAnimatedComponent(FastImage);
const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

const ProfileAvatar = ({ user, scrollY }) => {
	const [loaded, setLoaded] = useState(false);

	const animatedImageStyles = useAnimatedStyle(() => {
		const opacity = withSpring(loaded ? 1 : 0, {
			mass: 0.3,
			damping: 16,
			stiffness: 120,
		});
		return { opacity };
	});

	const animatedBlurContainerStyle = useAnimatedStyle(() => {
		const opacity = interpolate(scrollY.value, [0, 100], [0, 1], "clamp");
		return { opacity };
	});

	return (
		<>
			<AnimatedBlurView
				pointerEvents='none'
				style={[
					{
						position: "absolute",
						top: 0,
						left: 0,
						right: 0,
						zIndex: 9,
						bottom: 0,
						width: "100%",
						height: "100%",
					},
					animatedBlurContainerStyle,
				]}
				intensity={100}
				tint='dark'
				experimentalBlurMethod='dimezisBlurView'
			/>

			<AnimatedFastImage
				style={[
					{
						width: "100%",
						height: "100%",
						position: "absolute",
						top: 0,
						left: 0,
					},
					animatedImageStyles,
				]}
				source={{
					uri: `${URLS.CDN_AVATARS_URL}${user?.avatar}`,
					priority: FastImage.priority.high,
				}}
				onLoad={() => setLoaded(true)}
			/>

			{!loaded && (
				<Blurhash
					style={{
						width: "100%",
						height: "100%",
						position: "absolute",
						top: 0,
						left: 0,
					}}
					decodeAsync
					blurhash={user?.avatar_information?.blurhash}
				/>
			)}
		</>
	);
};

export default ProfileAvatar;
