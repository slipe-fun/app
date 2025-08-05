import React, { useEffect } from "react";
import { View, getVariableValue } from "tamagui";
import Animated, {
  useSharedValue,
  withSpring,
  useAnimatedStyle,
} from "react-native-reanimated";
import Icon from "@components/ui/icon";
import { quickSpring } from "@constants/easings";

const AnimatedView = Animated.createAnimatedComponent(View);
const iconColor = getVariableValue("$primary", "color");

const Checkbox = ({ initial = false }) => {
  const progress = useSharedValue(initial ? 1 : 0);

  const animatedCheck = useAnimatedStyle(() => ({
    opacity: progress.value,
    transform: [{ scale: progress.value }],
  }));

  useEffect(() => {
    progress.value = withSpring(initial ? 1 : 0, quickSpring);
  }, [initial]);

  return (
    <AnimatedView
      style={animatedCheck}
      w="$10"
      h="$10"
      alignItems="center"
      justifyContent="center"
    >
      <Icon icon="checkmark" size={24} color={iconColor} />
    </AnimatedView>
  );
};

export default Checkbox;
