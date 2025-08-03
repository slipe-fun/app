import { Button, View } from "tamagui";
import { LinearGradient } from "@tamagui/linear-gradient";
import MaskedView from "@react-native-masked-view/masked-view";
import { forwardRef, useMemo } from "react";
import Animated from "react-native-reanimated";
import { StyleSheet } from "react-native";

export const GradientBorder = forwardRef(
  (
    {
      children,
      borderWidth = 1,
      br,
      gradientColors = [
        "rgba(255, 255, 255, 0.2)",
        "rgba(255, 255, 255, 0)",
        "rgba(255, 255, 255, 0.2)",
      ],
      gradientStart = { x: 0, y: 0 },
      gradientEnd = { x: 1, y: 1 },
      isButton = false,
      animated,
      animatedStyle,
      maskAnimatedStyle,
      ...props
    },
    ref
  ) => {
    const maskStyles = useMemo(
      () =>
        StyleSheet.create({
          maskElementContainer: {
            flex: 1,
            borderWidth,
          },
        }),
      [br, borderWidth]
    );

    const BaseWrapper = isButton ? Button : View;
    const Wrapper = animated
      ? Animated.createAnimatedComponent(BaseWrapper)
      : BaseWrapper;

    const MaskComponent = animated
      ? Animated.createAnimatedComponent(MaskedView)
      : MaskedView;

    return (
      <Wrapper style={animatedStyle} unstyled br={br} ref={ref} {...props}>
        {children}
        <MaskComponent
          pointerEvents="none"
          style={[StyleSheet.absoluteFill, maskAnimatedStyle]}
          maskElement={<View br={br} style={maskStyles.maskElementContainer} />}
        >
          <LinearGradient
            colors={gradientColors}
            start={gradientStart}
            end={gradientEnd}
            style={StyleSheet.absoluteFill}
          />
        </MaskComponent>
      </Wrapper>
    );
  }
);
