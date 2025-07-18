import { useAnimatedStyle, interpolate } from "react-native-reanimated";

export default function useCategoryAnimations(
  scrollY,
  range,
  sizes,
  fullHeight,
  minHeight,
  isSlides
) {
  const opacityStyle = useAnimatedStyle(() => ({
    opacity: interpolate(scrollY.value, range, [1, 0.35], "clamp"),
  }));

  const heightStyle = useAnimatedStyle(() => ({
    height: interpolate(scrollY.value, range, [fullHeight, minHeight], "clamp"),
  }));

  const fontStyle = useAnimatedStyle(() => ({
    fontSize: interpolate(
      scrollY.value,
      range,
      [sizes.fontBig, sizes.fontSmall],
      "clamp"
    ),
    lineHeight: interpolate(
      scrollY.value,
      range,
      [sizes.lineBig, sizes.lineSmall],
      "clamp"
    ),
  }));

  const gradientStyle = useAnimatedStyle(() => ({
    opacity: interpolate(scrollY.value, range, [1, 0], "clamp"),
  }));

  if (!isSlides) {
    const gapStyle = useAnimatedStyle(() => ({
      gap: interpolate(
        scrollY.value,
        range,
        [sizes.gapBig, sizes.gapSmall],
        "clamp"
      ),
    }));

    return { opacityStyle, heightStyle, fontStyle, gapStyle, gradientStyle };
  } else {
    return { opacityStyle, heightStyle, fontStyle, gradientStyle };
  }
}
