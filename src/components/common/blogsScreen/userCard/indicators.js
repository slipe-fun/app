import styles from "../styles/userCardStyles";
import { View, Animated, Easing } from "react-native";
import { COLORS } from "../../../../constants/theme";
import { useEffect, useRef } from "react";

const Indicator = ({ isFinished, isPaused, onFinished, duration, currentIndex, count }) => {
	const animatedValue = useRef(new Animated.Value(isFinished ? 1 : 0)).current;
	const animatedValueWidth = useRef(new Animated.Value(isFinished ? 1 : 0)).current;

	useEffect(() => {
		Animated.timing(animatedValue, {
			toValue: isFinished ? 1 : 0,
			duration: 300,
			useNativeDriver: true,
		}).start();
	}, [isFinished]);

	const runWidthAnimation = () => {
		animatedValueWidth.setValue(0);
		const anim = Animated.timing(animatedValueWidth, {
			toValue: 1,
			duration,
			easing: Easing.linear,
			useNativeDriver: false,
		});
		anim.start(({ finished }) => {
			if (!finished) return;
			if (currentIndex + 1 < count) {
				onFinished();
			} else {
				runWidthAnimation();
			}
		});
	};

	useEffect(() => {
		if (isPaused) {
			animatedValueWidth.stopAnimation();
			animatedValueWidth.setValue(0);
		} else {
			runWidthAnimation();
		}
	}, [isPaused, currentIndex, isFinished, duration]);

	const backgroundColor = animatedValue.interpolate({
		inputRange: [0, 1],
		outputRange: [COLORS.indicator, COLORS.white],
	});

	const widthInterpolated = animatedValueWidth.interpolate({
		inputRange: [0, 1],
		outputRange: ["0%", "100%"],
	});

	return (
		<Animated.View style={[styles.indicator, { backgroundColor }]}>
			<Animated.View style={[styles.indicatorInner, { width: widthInterpolated }]} />
		</Animated.View>
	);
};

const Indicators = ({ isPaused = true, currentIndex = 0, count = 2, onFinish, duration = 5500 }) => (
	<View style={styles.container}>
		{[...Array(count).keys()].map(index => (
			<Indicator
				key={index}
				duration={duration}
				currentIndex={currentIndex}
				count={count}
				onFinished={onFinish}
				isPaused={isPaused || currentIndex !== index}
				isFinished={index < currentIndex}
			/>
		))}
	</View>
);

export default Indicators;
