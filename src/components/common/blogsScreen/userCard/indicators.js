import React, { useEffect, memo } from "react";
import { View, StyleSheet } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withTiming, cancelAnimation, runOnJS, Easing } from "react-native-reanimated";
import styles from "../styles/userCardStyles";
import { BORDER_RADIUS, COLORS } from "../../../../constants/theme";

const IndicatorBar = memo(({ index, activeIndex, duration, isPaused, onFinish }) => {
	const progress = useSharedValue(index < activeIndex ? 1 : 0);

	const style = useAnimatedStyle(() => ({
		flex: 1,
		height: 2.5,
		borderRadius: BORDER_RADIUS.xs,
		backgroundColor: COLORS.indicator,
		overflow: "hidden",
		justifyContent: "center",
	}));

	const innerStyle = useAnimatedStyle(() => ({
		width: `${progress.value * 100}%`,
		height: "100%",
		backgroundColor: COLORS.white,
		borderRadius: BORDER_RADIUS.xs,
	}));

	useEffect(() => {
		cancelAnimation(progress);
		if (index < activeIndex) {
			progress.value = 1;
		} else if (index > activeIndex) {
			progress.value = 0;
		} else {
			progress.value = 0;
			if (!isPaused) {
				progress.value = withTiming(1, { duration, easing: Easing.linear }, finished => {
					if (finished) {
						runOnJS(onFinish)();
					}
				});
			}
		}

		return () => cancelAnimation(progress);
	}, [activeIndex, isPaused, duration]);

	return (
		<Animated.View style={style}>
			<Animated.View style={innerStyle} />
		</Animated.View>
	);
});

const Indicators = ({ count, currentIndex, duration = 5000, onFinish, isPaused = false }) => {
	return (
		<View style={styles.container}>
			{Array.from({ length: count }).map((_, index) => (
				<IndicatorBar key={index} index={index} activeIndex={currentIndex} duration={duration} isPaused={isPaused} onFinish={onFinish} />
			))}
		</View>
	);
};

export default Indicators;
