import React, { useEffect, useRef } from "react";
import { View } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withTiming, runOnJS, Easing, cancelAnimation } from "react-native-reanimated";
import { BORDER_RADIUS, COLORS } from "../../../../constants/theme";
import styles from "../styles/userCardStyles";

const IndicatorBar = ({ isActive, progress }) => {
	const animatedStyle = useAnimatedStyle(() => {
		const widthPercentage = isActive ? progress.value * 100 : progress.value === 1 ? 100 : 0;
		return {
			width: `${widthPercentage}%`,
			backgroundColor: COLORS.white,
			height: "100%",
			borderRadius: BORDER_RADIUS.xs,
		};
	});

	return (
		<View style={styles.indicator}>
			<Animated.View style={animatedStyle} />
		</View>
	);
};

const Indicators = ({ count, currentIndex, duration = 5000, onFinish, isPaused = false }) => {
	const progresses = useRef(Array.from({ length: count }, () => useSharedValue(0))).current;

	useEffect(() => {
		progresses.forEach(p => cancelAnimation(p));

		progresses.forEach((progress, index) => {
			if (index < currentIndex) {
				progress.value = 1;
			} else if (index > currentIndex) {
				progress.value = 0;
			}
		});

		const activeProgress = progresses[currentIndex];
		if (!activeProgress) return;

		activeProgress.value = 0;

		if (!isPaused) {
			activeProgress.value = withTiming(
				1,
				{
					duration: duration,
					easing: Easing.linear,
				},
				finished => {
					if (finished === true && onFinish) {
						runOnJS(onFinish)();
					}
				}
			);
		}

		return () => {
			if (activeProgress) {
				cancelAnimation(activeProgress);
			}
		};
	}, [currentIndex, isPaused, duration, onFinish, progresses, count]);

	return (
		<View style={styles.container}>
			{progresses.map((progress, index) => (
				<IndicatorBar key={index} isActive={index === currentIndex} progress={progress} />
			))}
		</View>
	);
};

export default Indicators;
