import { useProfileStore } from "@stores/profileScreen";
import { View, getVariableValue } from "tamagui";
import Animated, { useAnimatedStyle, interpolate } from "react-native-reanimated";
import useInsets from "@hooks/ui/useInsets";
import MediaPreview from "@components/ui/mediaPreview";
import { useWindowDimensions, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const AnimatedView = Animated.createAnimatedComponent(View);

const avatarSize = getVariableValue("$24", "size");
const buttonSize = getVariableValue("$13", "size");

const ProfileBanner = ({ scrollY }) => {
	const user = useProfileStore(state => state.user);

	const insets = useInsets();
	const { width } = useWindowDimensions();

	const size = insets.top + avatarSize + buttonSize / 2;

	const animatedViewStyle = useAnimatedStyle(() => {
		const opacity = interpolate(scrollY.value, [0, avatarSize], [1, 0], "clamp");
		return {
			opacity,
		};
	});

	return (
		<View top={0} w={width} position='absolute' h={size}>
			<LinearGradient
				colors={["transparent", "#000"]}
				start={{ x: 0, y: 0 }}
				end={{ x: 0, y: 1 }}
				style={[StyleSheet.absoluteFill, {zIndex: 10}]}
			/>
			<AnimatedView style={[animatedViewStyle, StyleSheet.absoluteFill]}>
				<MediaPreview blurhash={user?.avatar_information?.blurhash} type='avatar' media={user?.avatar} />
			</AnimatedView>
		</View>
	);
};

export default ProfileBanner;
