import FastImage from "react-native-fast-image";
import { memo, useState, useCallback } from "react";
import { Blurhash } from "react-native-blurhash";
import { View } from "tamagui";
import Animated, { useAnimatedStyle, withSpring, interpolate } from "react-native-reanimated";
import { URLS } from "@constants/urls";
import { Dimensions, StyleSheet } from "react-native";
import { fastSpring } from "@constants/easings";
import { useInsets } from "@hooks/useInsets";

const AnimatedFastImage = Animated.createAnimatedComponent(FastImage);
const AnimatedView = Animated.createAnimatedComponent(View);

const { width } = Dimensions.get("window");

const ProfileAvatar = ({ user, scrollY }) => {
	const [loaded, setLoaded] = useState(false);
	const insets = useInsets();

	const handleLoad = useCallback(() => {
		setLoaded(true);
	}, []);

	const animatedImageStyle = useAnimatedStyle(() => {
		const opacity = withSpring(loaded ? 1 : 0, fastSpring);
		return {
			opacity,
		};
	}, [loaded]);

	const animatedViewStyle = useAnimatedStyle(() => {
		const opacity = interpolate(scrollY.value, [0, width - insets.top], [1, 0], "clamp");
		const height = interpolate(scrollY.value, [0, width + insets.top], [width, 0], "clamp");
		return {
			opacity,
			height
		};
	}, []);

	return (
		<AnimatedView position="absolute" width={width} style={animatedViewStyle}>
			<AnimatedFastImage
				resizeMode={FastImage.resizeMode.cover}
				style={[StyleSheet.absoluteFill, animatedImageStyle]}
				source={{
					uri: `${URLS.CDN_AVATARS_URL}${user?.avatar}`,
					priority: FastImage.priority.high,
				}}
				onLoad={handleLoad}
			/>
			{!loaded && <Blurhash style={StyleSheet.absoluteFill} decodeAsync blurhash={user?.avatar_information?.blurhash} />}
		</AnimatedView>
	);
};

export default memo(ProfileAvatar);
