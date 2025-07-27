import { View, XStack } from "tamagui";
import { useEffect, useState, useRef } from "react";
import Animated, { useAnimatedStyle, useSharedValue, withTiming, cancelAnimation, runOnJS, withSpring } from "react-native-reanimated";
import { quickSpring } from "@constants/easings";

const AnimatedView = Animated.createAnimatedComponent(View);

const Indicator = ({ index, finished, active, paused, onFinished, duration, indicatorWidth, containerWidth, postsLength }) => {
	const widthProgress = useSharedValue(0);
	const progressWhenPaused = useSharedValue(0);
	const pausedValue = useSharedValue(0);
	const opacityValue = useSharedValue(1);
	const pausedHeightValue = useSharedValue(2);

	const animatedWidthStyle = useAnimatedStyle(() => ({
		width: `${widthProgress.value * 100}%`,
	}));

	const animatedViewStyle = useAnimatedStyle(() => {
		if (containerWidth <= 0) return {};
		return {
			width: pausedValue.value,
			height: pausedHeightValue.value,
			opacity: opacityValue.value,
		};
	}, [active, paused, containerWidth, indicatorWidth]);

	useEffect(() => {
		if (active) {
			pausedHeightValue.value = withSpring(paused ? 6 : 2, quickSpring);
			pausedValue.value = withSpring(paused ? containerWidth : indicatorWidth, quickSpring);
		} else {
			pausedValue.value = withSpring(paused ? 0 : indicatorWidth, quickSpring);
			opacityValue.value = withSpring(paused ? 0 : 1, quickSpring);
			widthProgress.value = 0;
			return;
		}

		if (paused) {
			progressWhenPaused.value = widthProgress.value;
			cancelAnimation(widthProgress);
		} else {
			const remaining = 1 - progressWhenPaused.value;
			widthProgress.value = withTiming(1, { duration: duration * remaining }, finishedAnim => {
				"worklet";
				if (finishedAnim && index < postsLength - 1) {
					runOnJS(onFinished)();
				}
			});
		}
	}, [paused, active]);

	return (
		<AnimatedView w={indicatorWidth} overflow="hidden" style={animatedViewStyle} h={2} backgroundColor={finished ? "$white" : "$indicator"} br='$full'>
			<AnimatedView f={1} h='$full' br='$full' backgroundColor='$white' style={animatedWidthStyle} />
		</AnimatedView>
	);
};

const Indicators = ({ paused = true, active, currentIndex = 0, postsLength, onFinish, userId, duration = 8 }) => {
	const [containerWidth, setContainerWidth] = useState(0);
	const ref = useRef(null);

	useEffect(() => {
		if (ref.current?.getBoundingClientRect) {
			setContainerWidth(ref.current.getBoundingClientRect().width);
		}
	}, []);

	const indicatorWidth = containerWidth > 0 ? (containerWidth - (4 * postsLength - 1)) / postsLength : 0;

	return (
		<XStack ref={ref} w='$full' justifyContent='space-between'>
			{Array.from({ length: postsLength }, (_, index) => (
				<Indicator
					key={`${userId}-${index}`}
					index={index}
					containerWidth={containerWidth}
					indicatorWidth={indicatorWidth}
					duration={duration * 1000}
					postsLength={postsLength}
					onFinished={onFinish}
					active={active && currentIndex === index}
					paused={paused}
					finished={index < currentIndex}
				/>
			))}
		</XStack>
	);
};

export default Indicators;
