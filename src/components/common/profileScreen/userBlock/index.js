import { View, getVariableValue, Text } from "tamagui";
import { Blurhash } from "react-native-blurhash";
import ProfileActions from "./actions";
import Icon from "@components/ui/icon";
import { memo, useMemo, useRef, useEffect } from "react";
import GetNormalDate from "@lib/getNormalDate";
import { Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { interpolate, useAnimatedStyle } from "react-native-reanimated";
import { useInsets } from "@hooks/useInsets";

const { width } = Dimensions.get("window");
const iconColor = getVariableValue("$white", "color");
const nicknameStart = getVariableValue("$7", "size");
const nicknameAnimated = getVariableValue("$4", "size");
const nicknameStartLine = getVariableValue("$7", "lineHeight");
const marginBottomVar = getVariableValue("$5", "space");
const marginAnimatedBottomVar = getVariableValue("$3", "space");
const nicknameAnimatedLine = getVariableValue("$4", "lineHeight");

const AnimatedText = Animated.createAnimatedComponent(Text);
const AnimatedView = Animated.createAnimatedComponent(View);

const UserInfo = memo(({ user, top, scrollY, viewHeight }) => {
	const animatedViewStyle = useAnimatedStyle(() => {
		const opacity = interpolate(scrollY.value, [width - viewHeight, (width - viewHeight) + 20], [0.7 , 0.35], 'clamp');
		return {
			opacity,
		};
	});

	const animatedNicknameStyle = useAnimatedStyle(() => {
		const fontSize = interpolate(scrollY.value, [width - viewHeight, (width - viewHeight) + 20], [nicknameStart , nicknameAnimated], 'clamp');
		const lineHeight = interpolate(scrollY.value, [width - viewHeight, (width - viewHeight) + 20], [nicknameStartLine , nicknameAnimatedLine], 'clamp');
		const marginBottom = interpolate(scrollY.value, [width - viewHeight, (width - viewHeight) + 20], [marginBottomVar , marginAnimatedBottomVar], 'clamp');
		return {
			fontSize,
			lineHeight,
			marginBottom
		};
	});

	return (
		<View pt={top} w='$full' alignItems='center' pb="$5" ph='$6'>
			<AnimatedText style={animatedNicknameStyle} fz='$7' lh='$7' fw='$3'>
				{user?.nickname || user?.username}
			</AnimatedText>
			<AnimatedView style={animatedViewStyle} opacity={0.7} flexDirection='row' alignItems='center' gap='$5'>
				<View flexDirection='row' alignItems='center' gap='$2'>
					<Icon icon='profile' size={18} color={iconColor} />
					<Text fz='$2' lh='$2' fw='$2' color='$white'>
						{user?.subscribers}
					</Text>
				</View>
				<View br='$7' w='$0.5' h='$0.5' backgroundColor='$white' />
				<View flexDirection='row' alignItems='center' gap='$2'>
					<Icon icon='clock' size={18} color={iconColor} />
					<Text fz='$2' lh='$2' fw='$2' color='$white'>
						{GetNormalDate(user?.date)}
					</Text>
				</View>
			</AnimatedView>
		</View>
	);
});

const UserBlock = ({ user, scrollY, setViewHeight, viewHeight }) => {
	const ref = useRef();
	const insets = useInsets();

	const averageColor = useMemo(() => {
		const color = Blurhash.getAverageColor(user?.avatar_information?.blurhash);
		if (!color) return "0,0,0";
		return `${Math.round(color.r)}, ${Math.round(color.g)}, ${Math.round(color.b)}`;
	}, [user?.avatar_information?.blurhash]);

	useEffect(() => {
		setViewHeight(ref.current?.getBoundingClientRect?.()?.height || 300);
	}, [setViewHeight]);

	const animatedFillStyle = useAnimatedStyle(() => {
		const opacity = interpolate(scrollY.value, [width - viewHeight, (width - viewHeight) + 20], [0, 1], 'clamp');
		return {
			opacity,
		};
	});

	const gradientStyle = useMemo(() => ({
		position: "absolute",
		width: width,
		bottom: 0,
		height: viewHeight,
	}), [viewHeight]);

	return (
		<View w='$full' position='relative' borderBottomLeftRadius='$7' borderBottomRightRadius='$7' overflow='hidden'>
			<View w={width} position='relative' zIndex='$1' ref={ref}>
				<LinearGradient
					colors={[`rgba(${averageColor}, 0)`, `rgba(${averageColor}, 1)`]}
					start={{ x: 0.5, y: 0 }}
					end={{ x: 0.5, y: 0.95 }}
					style={gradientStyle}
				/>
				<AnimatedView bottom={0} position='absolute' w={width} h={viewHeight} backgroundColor={`rgb(${averageColor})`} style={animatedFillStyle} />
				<UserInfo viewHeight={viewHeight} scrollY={scrollY} top={insets.top} user={user} />
			</View>

			<ProfileActions scrollY={scrollY} averageColor={averageColor} />
		</View>
	);
};

export default memo(UserBlock);
