import { useSharedValue, useDerivedValue, runOnJS, useAnimatedReaction } from "react-native-reanimated";
import { Gesture } from "react-native-gesture-handler";

export function useHoldSeekGesture({ onProgressChange, sensitivity = 300, onSeekStart, onSeekEnd }) {
	const isSeeking = useSharedValue(false);
	const translationX = useSharedValue(0);
	const savedProgress = useSharedValue(0);

	const progress = useDerivedValue(() => {
		"worklet";
		const currentProgress = savedProgress.value + translationX.value / sensitivity;
		return Math.max(0, Math.min(1, currentProgress));
	});

	useAnimatedReaction(
		() => progress.value,
		(current, previous) => {
			if (current !== previous && onProgressChange) {
				runOnJS(onProgressChange)(current);
			}
		},
		[onProgressChange, sensitivity]
	);

	const gesture = Gesture.LongPress()
		.minDuration(200)
		.onStart(() => {
			"worklet";
			isSeeking.value = true;
			if (onSeekStart) {
				runOnJS(onSeekStart)();
			}
		})
		.onUpdate(e => {
			"worklet";
			translationX.value = e.translationX;
		})
		.onEnd(() => {
			"worklet";
			savedProgress.value = progress.value;
			isSeeking.value = false;
			translationX.value = 0;

			if (onSeekEnd) {
				runOnJS(onSeekEnd)();
			}
		});

	return { gesture, progress, isSeeking };
}
