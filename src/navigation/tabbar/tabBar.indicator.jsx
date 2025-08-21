import React, { useEffect, useRef } from "react";
import { useWindowDimensions } from "react-native";
import { BlurView } from "expo-blur";
import {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { getVariableValue } from "tamagui";
import { normalSpring } from "@constants/easings";
import useInsets from "@hooks/ui/useInsets";
import { GradientBorder } from "@components/ui/gradientBorder";
import { StyleSheet } from "react-native";

const indicatorWidth = getVariableValue("$20.5", "size");
const indicatorHeight = getVariableValue("$12.5", "size");

export default function TabBarIndicator({ index = 0, count = 3 }) {
  const x = useSharedValue(0);
  const scaleX = useSharedValue(1);
  const prevIndex = useRef(index);
  const insets = useInsets();
  const { width } = useWindowDimensions();

  useEffect(() => {
    if (!width || count <= 0) return;
    const tabWidth = width / count;
    const target = tabWidth * index + (tabWidth - indicatorWidth) / 2;

    const direction = index > prevIndex.current ? 1 : -1;
    prevIndex.current = index;

    x.value = withSpring(target, normalSpring);

    scaleX.value = withSpring(1 + 0.2 * direction, normalSpring, () => {
      scaleX.value = withSpring(1, normalSpring);
    });
  }, [index, width, count]);

  const style = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: x.value }, { scaleX: scaleX.value }],
    };
  });

  return (
    <GradientBorder bottom={insets.bottom} position="absolute" overflow="hidden" zIndex="$1" left={0} w={indicatorWidth} h={indicatorHeight} animated br="$full" animatedStyle={style}>
      <BlurView
        intensity={24}
        blurReductionFactor={0}
        tint="systemThickMaterial"
        style={StyleSheet.absoluteFill}
      />
    </GradientBorder>
  );
}
