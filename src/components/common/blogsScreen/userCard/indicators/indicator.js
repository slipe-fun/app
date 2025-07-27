import { View } from "tamagui";
import { memo, useEffect } from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { quickSpring } from "@constants/easings";

const AnimatedView = Animated.createAnimatedComponent(View);

const Indicator = ({ paused, progress, indicatorWidth, containerWidth }) => {
  const pausedValue = useSharedValue(indicatorWidth);
  const pausedHeightValue = useSharedValue(2);

  const animatedWidthStyle = useAnimatedStyle(() => ({
    width: `${progress.value * 100}%`,
  }));

  const animatedViewStyle = useAnimatedStyle(() => ({
    width: pausedValue.value,
    height: pausedHeightValue.value,
  }));

  useEffect(() => {
    pausedHeightValue.value = withSpring(paused ? 6 : 2, quickSpring);
    pausedValue.value = withSpring(paused ? containerWidth : indicatorWidth, quickSpring);
  }, [paused, indicatorWidth, containerWidth]);

  return (
    <AnimatedView
      w={indicatorWidth}
      overflow="hidden"
      style={animatedViewStyle}
      h={2}
      backgroundColor="$indicator"
      br="$full"
    >
      <AnimatedView
        f={1}
        h="$full"
        br="$full"
        backgroundColor="$white"
        style={animatedWidthStyle}
      />
    </AnimatedView>
  );
};

export default memo(Indicator);
