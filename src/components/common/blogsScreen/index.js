

import { useState } from "react";
import { View } from "react-native";
import styles from "./styles/usersSliderStyles";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing } from "react-native-reanimated";
import UserCard from "./userCard";

const GAP = 16;

const TIMING_CONFIG = {
	duration: 400,
	easing: Easing.out(Easing.cubic),
};

const UsersSlider = ({ users }) => {
	const [containerHeight, setContainerHeight] = useState(0);
	const translateY = useSharedValue(0);
	const context = useSharedValue({ y: 0 });
	const activeIndex = useSharedValue(0);

	const handleLayout = event => {
		const { height } = event.nativeEvent.layout;
		if (height > 0 && height !== containerHeight) {
			setContainerHeight(height);
			translateY.value = 0;
			activeIndex.value = 0;
		}
	};

	const panGesture = Gesture.Pan()
		.enabled(containerHeight > 0)
		.onStart(() => {
			context.value = { y: translateY.value };
		})
		.onUpdate(event => {
			const itemFullHeight = containerHeight + GAP;
			let newTranslateY = context.value.y + event.translationY;
			const lowerBound = -(users.length - 1) * itemFullHeight;
			translateY.value = Math.max(Math.min(newTranslateY, 0), lowerBound);
		})

		.onEnd(event => {
			const itemFullHeight = containerHeight + GAP;
			const velocityY = event.velocityY;
			const translationY = event.translationY;
			const currentActiveIndex = activeIndex.value;
			const lastIndex = users.length - 1;
			const VELOCITY_THRESHOLD = 200;
			const TRANSLATION_THRESHOLD = containerHeight / 4;

			let targetIndex = currentActiveIndex;

			if (velocityY < -VELOCITY_THRESHOLD || translationY < -TRANSLATION_THRESHOLD) {
				targetIndex = currentActiveIndex + 1;
			} else if (velocityY > VELOCITY_THRESHOLD || translationY > TRANSLATION_THRESHOLD) {
				targetIndex = currentActiveIndex - 1;
			}

			targetIndex = Math.max(0, Math.min(targetIndex, lastIndex));

			const targetTranslateY = -targetIndex * itemFullHeight;
			translateY.value = withTiming(targetTranslateY, TIMING_CONFIG);
			activeIndex.value = targetIndex;
		});

	const animatedStyle = useAnimatedStyle(() => {
		const totalHeight = containerHeight > 0 ? (containerHeight + GAP) * users.length - GAP : 0;
		return {
			height: totalHeight,
			transform: [{ translateY: translateY.value }],
		};
	}, [containerHeight]);

	return (
		<View style={styles.outerContainer} onLayout={handleLayout}>
			{containerHeight > 0 && (
				<GestureDetector gesture={panGesture}>
					<Animated.View style={[styles.animatedContainer, animatedStyle]}>
						{users.map((user, index) => (
							<View key={user.id} style={[styles.pageContainer, { height: containerHeight, marginBottom: GAP }]}>
								<UserCard user={user} index={index} />
							</View>
						))}
					</Animated.View>
				</GestureDetector>
			)}
		</View>
	);
};

export default UsersSlider;
