import { View } from "tamagui";
import { Blurhash } from "react-native-blurhash";
import ProfileActions from "./actions";
import { memo, useMemo, useRef, useEffect } from "react";
import { Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { interpolate, useAnimatedStyle } from "react-native-reanimated";
import useInsets from "@hooks/ui/useInsets";
import UserInfo from "./userInfo";

const { width } = Dimensions.get("window"); 
const AnimatedView = Animated.createAnimatedComponent(View);

const UserBlock = ({ user, scrollY, setActionsHeight, actionsHeight, viewHeight, setViewHeight }) => {
	const ref = useRef();
	const insets = useInsets();

	const averageColor = useMemo(() => {
		const color = Blurhash.getAverageColor(user?.avatar_information?.blurhash);
		if (!color) return "0,0,0";
		return `${Math.round(color.r)}, ${Math.round(color.g)}, ${Math.round(color.b)}`;
	}, [user?.avatar_information?.blurhash]);

	const animatedFillStyle = useAnimatedStyle(() => {
		const opacity = interpolate(scrollY.value, [width - viewHeight, width], [0, 1], 'clamp');
		return {
			opacity,
		};
	}); 
 
	const animatedViewStyle = useAnimatedStyle(() => {
		const translateY = interpolate(scrollY.value, [0, width - viewHeight], [width - viewHeight, 0], 'clamp');
		return {
			transform: [{ translateY }],
		};
	});

	const gradientStyle = useMemo(() => ({
		position: "absolute",
		width: width,
		bottom: 0,
		height: viewHeight,
	}), [viewHeight]);
 
	useEffect(() => {
		setViewHeight(ref.current?.getBoundingClientRect?.()?.height);
	}, [setViewHeight]);

	return (
		<AnimatedView borderBottomLeftRadius="$7" borderBottomRightRadius="$7" overflow='hidden' style={animatedViewStyle} w='$full' position="absolute" zIndex="$1">
			<View w={width} position='relative' zIndex="$1" ref={ref}>
				<LinearGradient
					colors={[`rgba(${averageColor}, 0)`, `rgba(${averageColor}, 1)`]}
					start={{ x: 0.5, y: 0 }}
					end={{ x: 0.5, y: 0.95 }}
					style={gradientStyle} 
				/> 
				<AnimatedView bottom={0} position='absolute' w={width} h={viewHeight} backgroundColor={`rgba(${averageColor}, 1)`} style={animatedFillStyle} />
				<UserInfo scrollY={scrollY} top={insets.top} user={user} viewHeight={viewHeight} />
			</View>

			<ProfileActions viewHeight={viewHeight} scrollY={scrollY} averageColor={averageColor} actionsHeight={actionsHeight} setActionsHeight={setActionsHeight} />
		</AnimatedView>
	);
};

export default memo(UserBlock);
 