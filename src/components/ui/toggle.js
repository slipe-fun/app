import { useEffect } from "react";
import { View, getVariableValue, useTheme } from "tamagui";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  interpolateColor,
} from "react-native-reanimated";
import { quickSpring } from "@constants/easings";
import * as Haptics from "expo-haptics";

const AnimatedView = Animated.createAnimatedComponent(View);

const green = getVariableValue("$green", "color");

const Toggle = ({ initial = false }) => {
  const progress = useSharedValue(initial ? 1 : 0);
  const theme = useTheme();

  const innerBlock = theme.innerBlock.get();

  const animatedTrack = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      progress.value,
      [0, 1],
      [innerBlock, green]
    ),
  }));

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
  };

  const animatedThumb = useAnimatedStyle(() => ({
    transform: [{ translateX: progress.value * 20 }],
  }));

  useEffect(() => {
    progress.value = withSpring(initial ? 1 : 0, quickSpring);
  }, [initial]);

  return (
    <AnimatedView
      w="$16"
      h="$9"
      p="$0.5"
      onPress={handlePress}
      br="$full"
      style={animatedTrack}
    >
      <AnimatedView
        h="$7.5"
        w="$10"
        backgroundColor="$white"
        br="$full"
        shadowColor="$black"
        shadowOpacity={0.2}
        shadowRadius={8}
        style={animatedThumb}
      />
    </AnimatedView>
  );
};

export default Toggle;
