import { View } from "tamagui";
import { LinearGradient } from "@tamagui/linear-gradient";
import MaskedView from "@react-native-masked-view/masked-view";
import { forwardRef, useMemo } from "react";
import { StyleSheet } from "react-native";

export const GradientBorder = forwardRef(
  (
    {
      children,
      style,
      borderWidth = 1,
      borderRadius = 10,
      gradientColors = [
        "rgba(255, 255, 255, 0.24)",
        "rgba(255, 255, 255, 0)",
        "rgba(255, 255, 255, 0.24)",
      ],
      gradientStart = { x: 0, y: 0 },
      gradientEnd = { x: 1, y: 1 },
    },
    ref
  ) => {
    const maskStyles = useMemo(
      () =>
        StyleSheet.create({
          maskElementContainer: {
            flex: 1,
            borderWidth,
            borderRadius,
          },
        }),
      [borderRadius, borderWidth]
    );

    return (
      <View ref={ref} style={[{ borderRadius, position: "relative" }, style]}>
        {children}
        <MaskedView
          style={StyleSheet.absoluteFill}
          maskElement={<View style={maskStyles.maskElementContainer} />}
        >
          <LinearGradient
            colors={gradientColors}
            start={gradientStart}
            end={gradientEnd}
            style={StyleSheet.absoluteFill}
          />
        </MaskedView>
      </View>
    );
  }
);
