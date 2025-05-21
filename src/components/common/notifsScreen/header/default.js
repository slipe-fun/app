import { getVariableValue } from "tamagui";
import Animated, { useAnimatedStyle, interpolate, useSharedValue, withSpring } from "react-native-reanimated";
import { YStack, XStack, Text, Button } from "tamagui";
import Icon from "../../../ui/icon";

const AnimatedYStack = Animated.createAnimatedComponent(YStack);

export const NotifsDefaultHeader = ({ scrollY }) => {
  const color = getVariableValue("$primary", "color");

  const rotation = useSharedValue(0);

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

  const animatedIconStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
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
            animation="fast"
            pressStyle={{
              scale: 0.9,
            }}
            onPress={() => {
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
          <Button
            p={0}
            animation="fast"
            backgroundColor="transparent"
            pressStyle={{
              scale: 0.9,
            }}
            icon={<Icon size={31} icon="gear" color={color} />}
          />
        </XStack>
      </XStack>
    </AnimatedYStack>
  );
};
