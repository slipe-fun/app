import { useEffect, useState, useCallback } from "react";
import { useWindowDimensions } from "react-native";
import { Gesture } from "react-native-gesture-handler";
import { cancelAnimation, Easing, runOnJS, useSharedValue, withTiming } from "react-native-reanimated";
import * as Haptics from "expo-haptics";

export default function useBlogsGestures(isActive, postsLength, progress, durationMs = 4000) {
	const [activeIndex, setActiveIndex] = useState(0);
	const [isSeeking, setIsSeeking] = useState(false);
	const [seekTimeSec, setSeekTimeSec] = useState(0);

	const { width: screenWidth } = useWindowDimensions();

	const savedProgress = useSharedValue(0);
	const lastHapticStep = useSharedValue(0);

	const updateIndex = useCallback(
		delta =>
			setActiveIndex(prev => {
				const next = prev + delta;
				return next < 0 || next >= postsLength ? prev : next;
			}),
		[postsLength]
	);

	const startAnimation = useCallback(
		(from = 0) => {
			"worklet";
			cancelAnimation(progress);
			const remaining = 1 - from;
			progress.value = withTiming(1, { duration: durationMs * remaining, easing: Easing.linear }, finished => {
				"worklet";
				if (finished) {
					runOnJS(updateIndex)(1);
				}
			});
		},
		[durationMs, progress, updateIndex]
	);

	useEffect(() => {
		if (!isActive) {
			cancelAnimation(progress);
			progress.value = 0;
			setActiveIndex(0);
			setSeekTimeSec(0);
		} else {
			progress.value = 0;
			requestAnimationFrame(() => startAnimation(0));
		}
	}, [activeIndex, isActive, progress, startAnimation]);

	const tapGesture = Gesture.Tap()
		.maxDuration(250)
		.onEnd(e => {
			"worklet";
			const delta = e.x < screenWidth / 2 ? -1 : 1;
			runOnJS(updateIndex)(delta);
		});

	const beginSeek = () => {
		"worklet";
		cancelAnimation(progress);
		savedProgress.value = progress.value;
		lastHapticStep.value = Math.floor(progress.value * 10);
		runOnJS(setIsSeeking)(true);
	};

	const panGesture = Gesture.Pan()
		.activeOffsetX([-10, 10])
		.onStart(beginSeek)
		.onUpdate(e => {
			"worklet";
			const raw = savedProgress.value + e.translationX / screenWidth;
			const clamped = Math.min(1, Math.max(0, raw));
			progress.value = clamped;

			const step = Math.floor(clamped * 10);
			if (step !== lastHapticStep.value) {
				lastHapticStep.value = step;
				runOnJS(Haptics.impactAsync)(Haptics.ImpactFeedbackStyle.Rigid);
			}
		})
		.onEnd(() => {
			"worklet";
			runOnJS(setIsSeeking)(false);
			const secs = progress.value * (durationMs / 1000);
			runOnJS(setSeekTimeSec)(secs);
			startAnimation(progress.value);
		});

	const longPressGesture = Gesture.LongPress()
		.minDuration(150)
		.maxDistance(screenWidth)
		.onStart(beginSeek)
		.onFinalize((_, success) => {
			"worklet";
			runOnJS(setIsSeeking)(false);
			if (success) {
				startAnimation(progress.value);
			}
		});

	useEffect(() => {
		setIsSeeking(false);
	}, [activeIndex]);

	const gesture = Gesture.Simultaneous(tapGesture, panGesture, longPressGesture);

	return { gesture, activeIndex, isSeeking, seekTimeSec };
}
