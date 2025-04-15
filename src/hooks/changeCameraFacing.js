import { useState, useCallback } from "react";
import { useSharedValue, useAnimatedStyle, withTiming, interpolate, Extrapolation, runOnJS } from "react-native-reanimated";
import { Gesture, Directions } from "react-native-gesture-handler";

export const useCameraFlip = (initialFacing = "front") => {
	const [facing, setFacing] = useState(initialFacing);
	const rotateY = useSharedValue(0);
	const isAnimating = useSharedValue(false);
	const updateFacingState = useCallback(newFacing => {
		setFacing(newFacing);
	}, []);

	const flipAnimatedStyle = useAnimatedStyle(() => {
		const rotateValue = interpolate(rotateY.value, [-180, 180], [-180, 180], Extrapolation.CLAMP);
		return {
			transform: [
				{ perspective: 1000 },
				{ rotateY: `${rotateValue}deg` },
			],
		};
	});

	const cameraViewStyle = useAnimatedStyle(() => {
		return {
			transform: [{ scaleX: facing === "front" ? -1 : 1 }],
		};
	}, [facing]);

	const triggerFlip = useCallback(
		direction => {
			"worklet";

			if (isAnimating.value) {
				return;
			}

			isAnimating.value = true;
			const targetRotation = direction === "right" ? 180 : -180;
			const newFacing = facing === "front" ? "back" : "front";

			rotateY.value = withTiming(targetRotation, { duration: 450 }, finished => {
				if (finished) {
					runOnJS(updateFacingState)(newFacing);
					rotateY.value = 0;
				}
				isAnimating.value = false;
			});
		},
		[facing]
	);

	const flingRightGesture = Gesture.Fling()
		.direction(Directions.RIGHT)
		.onEnd((_event, success) => {
			"worklet";
			if (success) {
				triggerFlip("right");
			}
		});

	const flingLeftGesture = Gesture.Fling()
		.direction(Directions.LEFT)
		.onEnd((_event, success) => {
			"worklet";
			if (success) {
				triggerFlip("left");
			}
		});

	const composedGesture = Gesture.Simultaneous(flingRightGesture, flingLeftGesture);

	return {
		facing,
		flipAnimatedStyle,
		cameraViewStyle,
		composedGesture,
		triggerFlip,
	};
};
