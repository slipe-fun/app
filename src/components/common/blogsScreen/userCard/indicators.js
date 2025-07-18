import styles from "../styles/userCardStyles";
import { View } from "react-native";
import { COLORS } from "@constants/theme";
import { useEffect } from "react";
import Animated, {
  Easing,
  interpolateColor,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withRepeat,
} from "react-native-reanimated";

const Indicator = ({
  index,
  isFinished,
  isPaused,
  onFinished,
  duration,
  currentIndex,
  postsLength,
}) => {
  const bgProgress = useSharedValue(isFinished ? 1 : 0);
  const widthProgress = useSharedValue(isFinished ? 1 : 0);

  const animatedBgStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        bgProgress.value,
        [0, 1],
        [COLORS.indicator, COLORS.white]
      ),
    };
  });

  const animatedWidthStyle = useAnimatedStyle(() => {
    return {
      width: `${widthProgress.value * 100}%`,
    };
  });

  useEffect(() => {
    if (!isPaused) {
      if (index === postsLength - 1) {
        widthProgress.value = withRepeat(
          withTiming(1, { duration, easing: Easing.linear }),
          -1,
          false
        );
      } else {
        widthProgress.value = withTiming(
          1,
          { duration, easing: Easing.linear },
          (finished) => {
            "worklet";
            if (finished) runOnJS(onFinished)();
          }
        );
      }
    } else {
      widthProgress.value = 0;
    }
  }, [isPaused, isFinished, currentIndex, duration]);

  useEffect(() => {
    bgProgress.value = withTiming(isFinished ? 1 : 0, { duration: 300 });
  }, [isFinished]);

  return (
    <Animated.View style={[styles.indicator, animatedBgStyle]}>
      <Animated.View style={[styles.indicatorInner, animatedWidthStyle]} />
    </Animated.View>
  );
};

const Indicators = ({
  isPaused = true,
  currentIndex = 0,
  postsLength,
  onFinish,
  userId,
  duration = 5.5,
}) => {
  return (
    <View style={styles.container}>
      {Array.from({ length: postsLength }, (_, index) => index).map((index) => (
        <>
          <Indicator
            key={`${userId}-${index}`}
            index={index}
            duration={duration * 1000}
            postsLength={postsLength}
            currentIndex={currentIndex}
            onFinished={onFinish}
            isPaused={isPaused || currentIndex !== index}
            isFinished={index < currentIndex}
          />
        </>
      ))}
    </View>
  );
};

export default Indicators;
