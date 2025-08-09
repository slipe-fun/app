import { XStack, Text } from "tamagui";
import Animated, {
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { getCharEnter, getCharExit } from "@constants/fadeAnimations";
import { fastSpring } from "@constants/easings";

const AnimatedText = Animated.createAnimatedComponent(Text);
const AnimatedXStack = Animated.createAnimatedComponent(XStack);

const Counter = ({ value, max, visible, ...props }) => {
  const containerStyle = useAnimatedStyle(
    () => ({
      opacity: withSpring(visible ? 1 : 0, fastSpring),
      transform: [{ scale: withSpring(visible ? 1 : 0.9, fastSpring) }],
    }),
    [visible]
  );

  return (
    <AnimatedXStack style={containerStyle} {...props}>
      {String(value)
        .split("")
        .map((char, i) => (
          <AnimatedText
            key={`${char}-${i}`}
            fz="$2"
            lh="$2"
            fw="$2"
            color="$color"
            entering={getCharEnter(i)}
            exiting={getCharExit(i)}
          >
            {char}
          </AnimatedText>
        ))}
      <Text fz="$2" lh="$2" fw="$2" color="$secondaryText">
        /{max}
      </Text>
    </AnimatedXStack>
  );
};

export default Counter;
