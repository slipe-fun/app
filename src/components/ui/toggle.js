import React, { useState } from "react";
import { Pressable } from "react-native";
import { View } from "tamagui";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  interpolateColor,
} from "react-native-reanimated";
import { quickSpring } from "@constants/easings";
import * as Haptics from "expo-haptics";

const AnimatedView = Animated.createAnimatedComponent(View);

const Toggle = ({ initial = false, onToggle }) => {
  const [active, setActive] = useState(initial);
  const progress = useSharedValue(initial ? 1 : 0);

  const toggleSwitch = () => {
    const newValue = !active;
    setActive(newValue);
    progress.value = withSpring(newValue ? 1 : 0, quickSpring);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onToggle?.(newValue);
  };

  const animatedTrack = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      progress.value,
      [0, 1],
      ["#333", "#1ED760"]
    ),
  }));

  const animatedThumb = useAnimatedStyle(() => ({
    transform: [{ translateX: progress.value * 20 }],
  }));

  return (
    <Pressable onPress={toggleSwitch}>
      <AnimatedView
        w="$16"
        h="$9"
        p="$0.5"
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
    </Pressable>
  );
};

export default Toggle;
