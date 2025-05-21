import { getVariableValue } from "tamagui";
import Animated, { useAnimatedStyle, interpolate } from "react-native-reanimated";
import { YStack, XStack, Text, Button } from "tamagui";
import Icon from "../../../ui/icon";

const AnimatedYStack = Animated.createAnimatedComponent(YStack);


export const NotifsDefaultHeader = ({ scrollY }) => {
  const color = getVariableValue("$primary", "color");

  const bigHeaderStyle = useAnimatedStyle(() => {
    const t = scrollY.value;
    const opacity = interpolate(t, [0, 60], [1, 0], "clamp");
    const translateY = interpolate(t, [0, 60], [0, -30], "clamp");
    const scale = interpolate(t, [0, 60], [1, 0.8], "clamp");
    return {
      opacity,
      transform: [{ translateY }, { scale }],
    };
  });

  return (
    <AnimatedYStack style={bigHeaderStyle} pt="$6" pb="$4" ph="$6">
      <XStack justifyContent="space-between" alignItems="center">
        <Text color="$color" lh="$8" fw="$3" fz="$8">
          Уведомления
        </Text>
        <XStack gap="$6">
          <Button
            p={0}
            backgroundColor="transparent"
            icon={<Icon size={31} icon="reload" color={color} />}
          />
          <Button
            p={0}
            backgroundColor="transparent"
            icon={<Icon size={31} icon="gear" color={color} />}
          />
        </XStack>
      </XStack>
    </AnimatedYStack>
  );
};
