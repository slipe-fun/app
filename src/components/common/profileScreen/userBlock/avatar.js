import FastImage from "react-native-fast-image";
import { memo } from "react";
import { View } from "tamagui";
import Animated, { interpolate, useAnimatedStyle } from "react-native-reanimated";
import { Dimensions } from "react-native";
import MediaPreview from "@components/ui/mediaPreview";

const AnimatedView = Animated.createAnimatedComponent(View);

const { width } = Dimensions.get("window");

const ProfileAvatar = ({ user, scrollY }) => {

	const animatedViewStyle = useAnimatedStyle(() => {
		const opacity = interpolate(scrollY.value, [0, width], [1, 0], 'clamp');
		const translateY = interpolate(scrollY.value, [0, width], [0, -width], 'clamp');
	   
		return {
		  opacity,
		  transform: [{ translateY }],
		};
	  }, []);

	return (
		<AnimatedView position="absolute" overflow="hidden" width={width} style={animatedViewStyle}>
			<MediaPreview priority={FastImage.priority.high} type="avatar" blurhash={user?.avatar_information?.blurhash} media={user?.avatar}/>
		</AnimatedView>
	);
};

export default memo(ProfileAvatar);
