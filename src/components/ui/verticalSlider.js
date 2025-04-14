import { useState, useRef } from "react";
import { View } from "react-native";
import styles from "./styles/usersSliderStyles";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing, runOnJS } from "react-native-reanimated";

const GAP = 16;

const TIMING_CONFIG = {
	duration: 375,
	easing: Easing.out(Easing.cubic),
};

const ACTIVATION_THRESHOLD_Y = 10;
const ACTIVATION_THRESHOLD_X = 10;

const VerticalSlider = ({ users, RenderSlideComponent }) => {
	const [containerHeight, setContainerHeight] = useState(0);
	const translateY = useSharedValue(0);
	const context = useSharedValue({ y: 0 });
	const activeIndex = useSharedValue(0);
	const [currentActiveIndexState, setCurrentActiveIndexState] = useState(0);

	const handleLayout = event => {
		const { height } = event.nativeEvent.layout;
		if (height > 0 && height !== containerHeight) {
			setContainerHeight(height);
			translateY.value = 0;
			activeIndex.value = 0;
			setCurrentActiveIndexState(0);
		}
	};

	const panGesture = Gesture.Pan()
		.enabled(containerHeight > 0)
		.activeOffsetY([-ACTIVATION_THRESHOLD_Y, ACTIVATION_THRESHOLD_Y])
		.failOffsetX([-ACTIVATION_THRESHOLD_X, ACTIVATION_THRESHOLD_X])
		.onStart(() => {
			context.value = { y: translateY.value };
		})
		.onUpdate(event => {
			const itemFullHeight = containerHeight + GAP;
			let newTranslateY = context.value.y + event.translationY;
			const lowerBound = -(users.length - 1) * itemFullHeight;
			const upperBound = 0;
			translateY.value = Math.max(Math.min(newTranslateY, upperBound), lowerBound);
		})
		.onEnd(event => {
			const itemFullHeight = containerHeight + GAP;
			const velocityY = event.velocityY;
			const translationY = event.translationY;
			const currentReanimatedActiveIndex = activeIndex.value;
			const lastIndex = users.length - 1;

			const VELOCITY_THRESHOLD = 200;
			const TRANSLATION_THRESHOLD = containerHeight / 4;

			let targetIndex = currentReanimatedActiveIndex;

			if (velocityY < -VELOCITY_THRESHOLD || translationY < -TRANSLATION_THRESHOLD) {
				targetIndex = currentReanimatedActiveIndex + 1;
			} else if (velocityY > VELOCITY_THRESHOLD || translationY > TRANSLATION_THRESHOLD) {
				targetIndex = currentReanimatedActiveIndex - 1;
			}

			targetIndex = Math.max(0, Math.min(targetIndex, lastIndex));

			const targetTranslateY = -targetIndex * itemFullHeight;

			translateY.value = withTiming(targetTranslateY, TIMING_CONFIG);
			activeIndex.value = targetIndex;

			if (currentActiveIndexState !== targetIndex) {
				runOnJS(setCurrentActiveIndexState)(targetIndex);
			}
		});

	const animatedStyle = useAnimatedStyle(() => {
		const totalHeight = containerHeight > 0 ? (containerHeight + GAP) * users.length - GAP : 0;
		return {
			height: totalHeight,
			transform: [{ translateY: translateY.value }],
		};
	}, [containerHeight, users.length]);

	return (
		<View style={styles.outerContainer} onLayout={handleLayout}>
			{containerHeight > 0 && (
				<GestureDetector gesture={panGesture}>
					<Animated.View style={[styles.animatedContainer, animatedStyle]}>
						{users.map((user, index) => {
							return (
								<View
									key={index}
									style={[
										styles.pageContainer,
										{
											height: containerHeight,
											marginBottom: index === users.length - 1 ? 0 : GAP,
										},
									]}
								>
									<RenderSlideComponent user={user} active={index !== currentActiveIndexState} />
								</View>
							);
						})}
					</Animated.View>
				</GestureDetector>
			)}
		</View>
	);
};

export default VerticalSlider;
