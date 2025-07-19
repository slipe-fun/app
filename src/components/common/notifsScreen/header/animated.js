import Animated, {
  useAnimatedStyle,
  interpolate,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { YStack, XStack, Text, Button, getVariableValue } from "tamagui";
import Icon from "@components/ui/icon";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Platform } from "react-native";

export const NotifsAnimatedHeader = ({ scrollY, refresh }) => {
  const rotation = useSharedValue(0);
  const color = getVariableValue("$primary", "color");
  const insets = useSafeAreaInsets();

  const smallHeaderStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scrollY.value, [20, 60], [0, 1], "clamp");
    return {
      opacity,
      pointerEvents: opacity === 0 ? "none" : "auto",
    };
  });

  const animatedIconStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
    };
  });

  return (
    <Animated.View
      style={[
        {
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "auto",
          zIndex: 10,
        },
        smallHeaderStyle,
      ]}
    >
      <YStack
        gap="$3"
        backgroundColor="$bg"
        pb="$5"
        pt={Platform.OS === "ios" ? insets.top : insets.top + 10}
      >
        <XStack ph="$6" alignItems="center" justifyContent="space-between">
          <Button
            p={0}
            backgroundColor="transparent"
            pressStyle={{
              scale: 0.9,
            }}
            onPress={() => {
              refresh()
              rotation.value = withSpring(rotation.value + 180, {
                damping: 20,
                mass: 1.2,
                stiffness: 250,
              });
            }}
            icon={
              <Animated.View style={animatedIconStyle}>
                <Icon size={31} icon="reload" color={color} />
              </Animated.View>
            }
          />
          <Text color="white" fw="$3" fz="$4" lh="$4">
            Уведомления
          </Text>
          <Button
            p={0}
            backgroundColor="transparent"
            pressStyle={{
              scale: 0.9,
            }}
            icon={<Icon size={31} icon="gear" color={color} />}
          />
        </XStack>
      </YStack>
    </Animated.View>
  );
};
