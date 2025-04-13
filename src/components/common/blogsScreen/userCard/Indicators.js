import React, { useEffect, useRef } from "react";
import { View, StyleSheet } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withTiming, runOnJS, Easing, cancelAnimation } from "react-native-reanimated";
import { COLORS } from "../../../../constants/theme";
import styles from "../styles/userCardStyles";

const IndicatorBar = ({ isActive, progress }) => {
	const animatedStyle = useAnimatedStyle(() => {
		const widthPercentage = isActive ? progress.value * 100 : progress.value === 1 ? 100 : 0;
		return {
			width: `${widthPercentage}%`,
			backgroundColor: COLORS.white,
			height: "100%",
		};
	});

	return (
		<View style={styles.indicator}>
			<Animated.View style={animatedStyle} />
		</View>
	);
};

const Indicators = ({ count, currentIndex, duration = 5000, onFinish, isPaused = false }) => {
	const progresses = useRef(Array.from({ length: count }, (_, i) => useSharedValue(i < currentIndex ? 1 : 0))).current;

	useEffect(() => {
		for (let i = 0; i < count; i++) {
			const progress = progresses[i];
			if (!progress) continue;
			cancelAnimation(progress);
			if (i < currentIndex) {
				progress.value = withTiming(1, { duration: 150 });
			} else {
				progress.value = 0;
			}
		}
	}, [currentIndex, count, progresses]);
	useEffect(() => {
		const activeProgress = progresses[currentIndex];
		if (!activeProgress) return;
		cancelAnimation(activeProgress);

		if (isPaused) {
		} else {
			const currentProgressValue = activeProgress.value;
			if (currentProgressValue < 1) {
				const remainingDuration = duration * (1 - currentProgressValue);
				activeProgress.value = withTiming(
					1,
					{
						duration: remainingDuration > 0 ? remainingDuration : 0,
						easing: Easing.linear,
					},
					finished => {
						if (finished === true && onFinish) {
							runOnJS(onFinish)();
						}
					}
				);
			}
		}

		return () => {
			if (activeProgress) {
				cancelAnimation(activeProgress);
			}
		};
	}, [currentIndex, isPaused, duration, onFinish, progresses]);

	return (
		<View style={styles.container}>
			{progresses.map((progress, index) => (
				<IndicatorBar key={index} isActive={index === currentIndex} progress={progress} />
			))}
		</View>
	);
};

export default Indicators;
