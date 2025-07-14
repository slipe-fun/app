import { useTheme } from "tamagui";
import Animated, {
  useAnimatedStyle,
  interpolate,
  useSharedValue,
  withSpring,
  useAnimatedRef,
} from "react-native-reanimated";
import { YStack, XStack, Text, Button } from "tamagui";
import Icon from "../../../ui/icon";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Platform } from "react-native";
import { useEffect, useState } from "react";
import useSearchStore from "@stores/searchScreen";
import SearchBar from "./searchBar";
import { fastSpring } from "@constants/easings";

const AnimatedYStack = Animated.createAnimatedComponent(YStack);
const AnimatedXStack = Animated.createAnimatedComponent(XStack);

export const SearchHeader = ({ scrollY }) => {
  const ref = useAnimatedRef();
  const insets = useSafeAreaInsets();
  const isFocused = useSearchStore((state) => state.isFocused);
  const [titleHeight, setTitleHeight] = useState(40);
  const titleOpacity = useSharedValue(1)
  const theme = useTheme();
  const color = theme.color.get();

  const bigHeaderStyle = useAnimatedStyle(() => {
    const t = scrollY.value;
    const opacity = interpolate(t, [0, 60], [1, 0], "clamp");
    const gap = interpolate(titleOpacity.value, [0, 1], [0, 16]);
    return {
      opacity,
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
    titleOpacity.value = withSpring(isFocused ? 0 : 1, fastSpring);
  }, [isFocused]);

  useEffect(() => {
    setTitleHeight(ref.current?.getBoundingClientRect()?.height);
  }, []);

  return (
    <AnimatedYStack
      style={bigHeaderStyle}
      ph="$3"
      pb="$3"
      pt={Platform.OS === "ios" ? insets.top : insets.top + 10}
    >
      <AnimatedXStack
        ref={ref}
        justifyContent="space-between"
        alignItems="center"
        style={titleStyle}
      >
        <Text color="$color" lh="$9" fw="$3" fz="$9">
          Search
        </Text>
        <Button
          p={0}
          width="$12"
          height="$12"
          br="$full"
          backgroundColor="$backgroundTransparent"
          pressStyle={{
            opacity: 0.9,
            scale: 0.9,
          }}
          icon={<Icon size={24} icon="gear" color={color} />}
        />
      </AnimatedXStack>
      <SearchBar/>
    </AnimatedYStack>
  );
};
