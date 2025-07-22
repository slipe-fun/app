import { Button, getVariableValue, View } from "tamagui";
import { Platform } from "react-native";
import { BlurView } from "expo-blur";
import { memo, useMemo } from "react";

const ColorfullyView = memo(({ children, isButton, color, ...props }) => {
  const borderRadius = useMemo(() => getVariableValue(props?.br, "radius"), [props?.br]);

  const Inner = (
    <>
      <View
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        br={borderRadius}
        borderWidth={1}
        borderColor="rgba(255,255,255,0.12)"
        zIndex="$2"
        pointerEvents="none"
      />
      {children}
    </>
  );

  if (Platform.OS === "android") {
    const Wrapper = isButton ? Button : View;
    return (
      <Wrapper {...props} backgroundColor={color}>
        {Inner}
      </Wrapper>
    );
  }

  return (
    <BlurView
      intensity={20}
      tint="dark"
      style={{
        borderRadius: borderRadius || 0,
        overflow: "hidden",
      }}
    >
      <View
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        br={borderRadius}
        borderWidth={1}
        borderColor="rgba(255,255,255,0.12)"
        zIndex="$2"
        pointerEvents="none"
      />
      {isButton ? (
        <Button {...props} backgroundColor="$transparent">
          {children}
        </Button>
      ) : (
        <View {...props} backgroundColor="$transparent">
          {children}
        </View>
      )}
    </BlurView>
  );
});

export default ColorfullyView;

