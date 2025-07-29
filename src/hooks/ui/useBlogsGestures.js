import { useEffect, useState } from "react";
import { useWindowDimensions } from "react-native";
import { Gesture } from "react-native-gesture-handler";
import {
  cancelAnimation,
  Easing,
  runOnJS,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

export default function useBlogsGestures(
  isActive,
  postsLength,
  progress,
  durationMs = 4000
) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);
  const [seekTimeSec, setSeekTimeSec] = useState(0);
  const { width: screenWidth } = useWindowDimensions();

  const savedProgress = useSharedValue(0);

  const updateIndex = (delta) => {
    setActiveIndex((prev) => {
      const next = prev + delta;
      if (next < 0 || next >= postsLength) return prev;
      return next;
    });
  };

  useEffect(() => {
    if (!isActive) {
      progress.value = 0;
      setActiveIndex(0);
      return;
    }

    cancelAnimation(progress);
    progress.value = 0;

    requestAnimationFrame(() => {
      progress.value = withTiming(
        1,
        { duration: durationMs, easing: Easing.linear },
        (finished) => {
          "worklet";
          if (finished) {
            runOnJS(updateIndex)(1);
          }
        }
      );
    });
  }, [activeIndex, isActive]);

  const FPS = 30;
  const FRAME_STEP = 10;
  const durationSec = durationMs / 1000;
  const stepCount = Math.floor(durationSec * FPS / FRAME_STEP);
  const stepProgress = 1 / stepCount;

  const clampToFrameStep = (p) => {
    "worklet";
    const clamped = Math.round(p / stepProgress) * stepProgress;
    return Math.max(0, Math.min(1, clamped));
  };

  const tapGesture = Gesture.Tap()
    .maxDuration(250)
    .onEnd((event) => {
      const delta = event.x < screenWidth / 2 ? -1 : 1;
      runOnJS(updateIndex)(delta);
    });

  const panGesture = Gesture.Pan()
    .activeOffsetX([-10, 10])
    .onStart(() => {
      savedProgress.value = progress.value;
    })
    .onUpdate((event) => {
      if (!isSeeking) return;
      const delta = event.translationX / screenWidth;
      const raw = savedProgress.value + delta;
      const clamped = clampToFrameStep(raw);
      progress.value = clamped;
    })
    .onEnd(() => {
      runOnJS(setIsSeeking)(false);
      const currentProgress = progress.value;
      const currentTime = currentProgress * durationSec;
      runOnJS(setSeekTimeSec)(currentTime);
      const remaining = 1 - currentProgress;
      const remainingDuration = durationMs * remaining;

      progress.value = withTiming(
        1,
        { duration: remainingDuration, easing: Easing.linear },
        (finished) => {
          "worklet";
          if (finished) {
            runOnJS(updateIndex)(1);
          }
        }
      );
    });

  const longPressGesture = Gesture.LongPress()
    .minDuration(150)
    .maxDistance(screenWidth)
    .onStart(() => {
      cancelAnimation(progress);
      runOnJS(setIsSeeking)(true);
    })
    .onEnd(() => {
      runOnJS(setIsSeeking)(false);
    })
    .onFinalize(() => {
      runOnJS(setIsSeeking)(false);
    });

  const gesture = Gesture.Simultaneous(
    tapGesture,
    longPressGesture,
    panGesture
  );

  return { gesture, activeIndex, isSeeking, seekTimeSec };
}
