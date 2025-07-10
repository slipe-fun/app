import { fastSpring } from "@constants/easings";
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withSpring,
} from "react-native-reanimated";
import Svg, { Circle } from "react-native-svg";
import { useEffect } from "react";
import { getFadeIn, getFadeOut } from "@constants/fadeAnimations";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedSvg = Animated.createAnimatedComponent(Svg);

const CircularIndicator = ({ size = 28, strokeWidth = 3, progress = 0 }) => {
  const radius = (size - strokeWidth) / 2;
  const c = 2 * Math.PI * radius;

  const progressValue = useSharedValue(progress);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: c * (1 - progressValue.value),
  }));

  useEffect(() => {
    progressValue.value = withSpring(progress, fastSpring);
  }, [progress]);

  return (
    <AnimatedSvg exiting={getFadeOut()} entering={getFadeIn()} width={size} height={size}>
      <Circle
        stroke="#ffffff44"
        fill="none"
        cx={size / 2}
        cy={size / 2}
        r={radius}
        strokeWidth={strokeWidth}
      />
      <AnimatedCircle
        stroke="white"
        fill="none"
        cx={size / 2}
        cy={size / 2}
        r={radius}
        strokeWidth={strokeWidth}
        strokeDasharray={`${c}, ${c}`}
        animatedProps={animatedProps}
        strokeLinecap="round"
      />
    </AnimatedSvg>
  );
};

export default CircularIndicator;
