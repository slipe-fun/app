import FastImage from "react-native-fast-image";
import { memo, useState, useCallback } from "react";
import { Blurhash } from "react-native-blurhash";
import { View } from "tamagui";
import Animated, { interpolate, useAnimatedStyle, withSpring } from "react-native-reanimated";
import { Dimensions, StyleSheet } from "react-native";
import { fastSpring } from "@constants/easings";
import { URLS } from "@constants/urls";

const AnimatedFastImage = Animated.createAnimatedComponent(FastImage);
const AnimatedView = Animated.createAnimatedComponent(View);

const { width } = Dimensions.get("window");

const ProfileAvatar = ({ user, scrollY, viewHeight }) => {
	const [loaded, setLoaded] = useState(false);

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
		const opacity = interpolate(scrollY.value, [0, width], [1, 0], 'clamp');
		const height = interpolate(scrollY.value, [0, width], [width, viewHeight], 'clamp');
	  
		return {
		  opacity,
		  height,
		};
	  }, []);

	return (
		<AnimatedView position="absolute" overflow="hidden" width={width} style={animatedViewStyle}>
			<AnimatedFastImage
				resizeMode={FastImage.resizeMode.cover}
				style={[{ height: width }, animatedImageStyle]}
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
