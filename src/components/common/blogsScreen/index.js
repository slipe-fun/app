

import React, { useState } from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing } from "react-native-reanimated";
import UserCard from "./userCard/actions";
import { borderRadius } from "../../../constants/Theme";

const USERS = [
	{ id: "1", name: "John Doe", postImage: "https://cdn.slipe.fun/posts/be87bd9f-6489-4cc9-853d-c011f0c80ebb.png", followers: 1.2, posts: 32 },
	{ id: "2", name: "Jane Smith", postImage: "https://cdn.slipe.fun/posts/2d62a6d0-d5b5-4981-8cf4-e0146a0a1458.png", followers: 2.5, posts: 45 },
	{ id: "3", name: "Alex Green", postImage: "https://cdn.slipe.fun/posts/6174e8d9-ed9e-4da6-889a-7b0d14deac20.png", followers: 0.8, posts: 15 },
	{ id: "4", name: "Sarah Blue", postImage: "https://cdn.slipe.fun/posts/b9b7e7a3-77b1-41d4-8191-7e2585ecaf83.png", followers: 5.1, posts: 102 },
];

const GAP = 16;

const TIMING_CONFIG = {
	duration: 400,
	easing: Easing.out(Easing.cubic),
};

const UsersSlider = () => {
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
			const lowerBound = -(USERS.length - 1) * itemFullHeight;
			translateY.value = Math.max(Math.min(newTranslateY, 0), lowerBound);
		})

		.onEnd(event => {
			const itemFullHeight = containerHeight + GAP;
			const velocityY = event.velocityY;
			const translationY = event.translationY;
			const currentActiveIndex = activeIndex.value;
			const lastIndex = USERS.length - 1;
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
		const totalHeight = containerHeight > 0 ? (containerHeight + GAP) * USERS.length - GAP : 0;
		return {
			height: totalHeight,
			transform: [{ translateY: translateY.value }],
		};
	}, [containerHeight]);

	return (
		<View style={styles.outerContainer} onLayout={handleLayout}>
			{containerHeight > 0 ? (
				<GestureDetector gesture={panGesture}>
					<Animated.View style={[styles.animatedContainer, animatedStyle]}>
						{USERS.map((user, index) => (
							<View key={user.id} style={[styles.pageContainer, { height: containerHeight, marginBottom: GAP }]}>
								<UserCard user={user} index={index} />
							</View>
						))}
					</Animated.View>
				</GestureDetector>
			) : (
				<View style={styles.placeholder} />
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	outerContainer: {
		width: "100%",
		overflow: "hidden",
		borderRadius: borderRadius.medium,
		height: "100%",
	},
	animatedContainer: {
		width: "100%",
	},
	pageContainer: {
		width: "100%",
		borderRadius: borderRadius.medium,
		overflow: "hidden",
		alignItems: "center",
		justifyContent: "center",
	},
	placeholder: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	cardContainer: { width: "100%", height: "100%", position: "relative" },
	cardImage: { width: "100%", height: "100%", resizeMode: "cover" },
	cardOverlay: { position: "absolute", bottom: 30, left: 15, backgroundColor: "rgba(0,0,0,0.6)", padding: 10, borderRadius: 5 },
	cardTextName: { color: "white", fontSize: 16, fontWeight: "bold", marginBottom: 4 },
	cardText: { color: "white", fontSize: 13 },
});

export default UsersSlider;
