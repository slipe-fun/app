import Animated, {
  useAnimatedStyle,
  interpolate,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Platform } from "react-native";
import SearchBar from "./searchBar";
import { YStack } from "tamagui";
import { useState } from "react";

const AnimatedYStack = Animated.createAnimatedComponent(YStack);

export const SearchAnimatedHeader = ({ scrollY }) => {
  const insets = useSafeAreaInsets();
  const [isFocused, setIsFocused] = useState(false)

  const smallHeaderStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scrollY.value, [20, 60], [0, 1], "clamp");
    return {
      opacity,
      pointerEvents: opacity === 0 ? "none" : "auto",
    };
  });

  return (
    <AnimatedYStack
      position="absolute"
      zIndex={10}
      right="0"
      left="0"
      top="0"
      backgroundColor="$bg"
      style={smallHeaderStyle}
      ph="$6"
      pb="$6"
      gap="$6"
      pt={Platform.OS === "ios" ? insets.top : insets.top + 10}
    >
      <SearchBar isButton setIsFocused={setIsFocused} isFocused={isFocused}/>
    </AnimatedYStack>
  );
};
