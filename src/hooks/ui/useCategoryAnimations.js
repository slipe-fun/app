import { useAnimatedStyle, interpolate } from "react-native-reanimated";

export default function useCategoryAnimations(
  scrollY,
  range,
  sizes,
  fullHeight,
  minHeight
) {
  const opacityStyle = useAnimatedStyle(() => ({
    opacity: interpolate(scrollY.value, range, [1, 0.35], "clamp"),
  }));

  const heightStyle = useAnimatedStyle(() => ({
    height: interpolate(scrollY.value, range, [fullHeight, minHeight], "clamp"),
  }));

  const fontStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: interpolate(
          scrollY.value,
          range,
          [1, sizes.fontSmall / sizes.fontBig],
          "clamp"
        ),
      }, {translateY: interpolate(scrollY.value, range, [0, sizes.gapBig], "clamp")}
    ],
  }));

  const gradientStyle = useAnimatedStyle(() => ({
    opacity: interpolate(scrollY.value, range, [1, 0], "clamp"),
  }));

  return { opacityStyle, heightStyle, fontStyle, gradientStyle };
}
