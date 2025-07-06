import { Button, getVariableValue, View } from "tamagui";
import { Platform } from "react-native";
import { BlurView } from "expo-blur";

const ColorfullyView = ({ children, isButton, color, ...props }) => {
  const borderRadius = getVariableValue(props.br, "radius");
  if (Platform.OS === "android") {
    return isButton ? (
      <Button {...props} backgroundColor={color}>
        <View
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0} 
          br={borderRadius}
          borderWidth={1}
          borderColor="rgba(255,255,255,0.2)"
          zIndex="$2"
        />
        {children}
      </Button>
    ) : (
      <View {...props} backgroundColor={color}>
        <View
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          br={borderRadius}
          borderWidth={1}
          borderColor="rgba(255,255,255,0.2)"
          zIndex="$2"
        />
        {children}
      </View>
    );
  }
  return (
    <BlurView
      intensity={20}
      tint="dark"
      style={{ borderRadius: borderRadius || 0, overflow: "hidden" }}
    >
      <View
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        br={borderRadius}
        borderWidth={1}
        borderColor="rgba(255,255,255,0.2)"
        zIndex="$2"
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
};

export default ColorfullyView;
