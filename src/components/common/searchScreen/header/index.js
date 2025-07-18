import { useTheme } from "tamagui";
import Animated, {
  useAnimatedStyle,
  interpolate,
  useSharedValue,
  useAnimatedRef,
  useDerivedValue,
  withSpring,
} from "react-native-reanimated";
import { YStack, XStack, Text, Button, View } from "tamagui";
import Icon from "../../../ui/icon";
import { useEffect, useState, useRef } from "react";
import useSearchStore from "@stores/searchScreen";
import SearchBar from "./searchBar";
import { fastSpring } from "@constants/easings";
import { Dimensions } from "react-native";
import useInsets from "@hooks/ui/useInsets";

const { width } = Dimensions.get("window");

const AnimatedXStack = Animated.createAnimatedComponent(XStack);

export const SearchHeader = ({ scrollY }) => {
  const ref = useAnimatedRef();
  const headerRef = useRef(null);
  const insets = useInsets();
  const isFocused = useSearchStore((state) => state.isFocused);
  const setHeaderHeight = useSearchStore((state) => state.setHeaderHeight);
  const [titleHeight, setTitleHeight] = useState(56);
  const theme = useTheme();
  const color = theme.color.get(); 

  const isFocusedShared = useSharedValue(isFocused);

  const animatedParams = useDerivedValue(() => {
    const t = scrollY.value;
    const focus = isFocusedShared.value;

    const interpolatedOpacity = interpolate(t, [0, 120], [1, 0], "clamp");
    const interpolatedHeight = interpolate(t, [0, 120], [titleHeight, 0], "clamp");

    const opacity = interpolate(focus, [0, 1], [interpolatedOpacity, 0], "clamp");
    const height = interpolate(focus, [0, 1], [interpolatedHeight, 0], "clamp");

    return { opacity, height };
  });

  const titleStyle = useAnimatedStyle(() => {
    return {
      opacity: animatedParams.value.opacity,
      height: animatedParams.value.height,
    };
  }); 

  useEffect(() => {
    setTitleHeight(ref.current?.getBoundingClientRect?.()?.height || 56);
    setHeaderHeight(headerRef.current?.getBoundingClientRect?.()?.height);
  }, []);

  useEffect(() => {
    isFocusedShared.value = withSpring(isFocused ? 1 : 0, fastSpring);
  }, [isFocused]);

  return (
    <YStack
      ph="$6"
      w={width}
      ref={headerRef}
      backgroundColor="$bg"
      position="absolute"
      zIndex="$1"
      pb="$5"
      pt={insets.top}
    >
      <AnimatedXStack
        ref={ref}
        h="$16"
        justifyContent="space-between"
        alignItems="flex-start"
        style={titleStyle}
      >
        <View h="$12" justifyContent="center">
        <Text color="$color" lh="$9" fw="$3" fz="$9">
          Поиск
        </Text>
        </View>
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
      <SearchBar />
    </YStack>
  );
};
