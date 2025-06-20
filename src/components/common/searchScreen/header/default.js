import { getVariableValue } from "tamagui";
import Animated, {
  useAnimatedStyle,
  interpolate,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { YStack, XStack, Text, Button } from "tamagui";
import Icon from "../../../ui/icon";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Platform } from "react-native";
import { useEffect, useState } from "react";
import SearchBar from "./searchBar";

const AnimatedYStack = Animated.createAnimatedComponent(YStack);
const AnimatedXStack = Animated.createAnimatedComponent(XStack);

export const SearchHeader = ({ scrollY, setIsFocused, isFocused }) => {
  const color = getVariableValue("$primary", "color");
  const insets = useSafeAreaInsets();
  const [titleHeight, setTitleHeight] = useState(36);
  const titleOpacity = useSharedValue(1)

  const bigHeaderStyle = useAnimatedStyle(() => {
    const t = scrollY.value;
    const opacity = interpolate(t, [0, 60], [1, 0], "clamp");
    const gap = interpolate(titleOpacity.value, [0, 1], [0, 16]);
    const translateY = interpolate(t, [0, 60], [0, -20], "clamp");
    const scale = interpolate(t, [0, 60], [1, 0.96], "clamp");
    return {
      opacity,
      transform: [{ translateY }, { scale }],
      gap,
    };
  });

  const titleStyle = useAnimatedStyle(() => {
    if (titleHeight === 0) return;
    const opacity = interpolate(titleOpacity.value, [0, 1], [0, 1]);
    const height = interpolate(titleOpacity.value, [0, 1], [0, titleHeight]);
    return {
      opacity,
      height,
    };
  })

  useEffect(() => {
    titleOpacity.value = withSpring(isFocused ? 0 : 1, {
      mass: 0.3,
      damping: 16,
      stiffness: 120,
    });
  }, [isFocused]);

  return (
    <AnimatedYStack
      style={bigHeaderStyle}
      ph="$3"
      pb="$3"
      pt={Platform.OS === "ios" ? insets.top : insets.top + 10}
    >
      <AnimatedXStack
        justifyContent="space-between"
        alignItems="center"
        onLayout={(e) => {
          const height = Math.round(e.nativeEvent.layout.height);
          if (titleHeight === 0 && height > 0) setTitleHeight(height);
        }}
        style={titleStyle}
      >
        <Text color="$color" lh="$9" fw="$3" fz="$9">
          Search
        </Text>
        <Button
          p={0}
          width="$11"
          height="$11"
          br="$full"
          animation="fast"
          backgroundColor="$backgroundTransparent"
          pressStyle={{
            opacity: 0.9,
            scale: 0.9,
          }}
          icon={<Icon size={24} icon="gear" color={color} />}
        />
      </AnimatedXStack>
      <SearchBar isFocused={isFocused} setIsFocused={setIsFocused}/>
    </AnimatedYStack>
  );
};
