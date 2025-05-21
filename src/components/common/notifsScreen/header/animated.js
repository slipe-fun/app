import { getVariableValue } from "tamagui";
import Animated, { useAnimatedStyle, interpolate, useSharedValue, withSpring, withTiming } from "react-native-reanimated";
import { YStack, XStack, Text, Button } from "tamagui";
import Icon from "../../../ui/icon";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Platform } from "react-native";

export const NotifsAnimatedHeader = ({ scrollY }) => {
  const rotation = useSharedValue(0);
  const color = getVariableValue("$primary", "color");
  const insets = useSafeAreaInsets();

  const smallHeaderStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scrollY.value, [20, 60], [0, 1], "clamp");
    return { opacity };
  });

  return(
    <Animated.View
        pointerEvents="none"
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
        <YStack pb="$5" ph="$6" backgroundColor="$bg" pt={Platform.OS === "ios" ? insets.top : insets.top + 10}>
          <XStack alignItems="center" justifyContent="space-between">
            <Button 
              p={0} 
              backgroundColor="transparent" 
              animation="fast"
              pressStyle={{
                scale: 0.975,
              }}
              onPress={() => {
                rotation.value = withTiming(rotation.value + 360, { duration: 300 }, () => {
                  // Optional: Reset rotation immediately or with a slight delay if you want it to be ready for another quick press
                  // rotation.value = 0; // or withTiming(0, {duration: 0})
                });
              }}
              icon={
                <Animated.View style={[{ transform: [{ rotate: rotation.value + 'deg' }] }]}>
                  <Icon size={31} icon="reload" color={color} />
                </Animated.View>
              } 
            />
            <Text color="white" fw="$3" fz="$5" lh="$5">
              Уведомления
            </Text>
            <Button 
              p={0} 
              backgroundColor="transparent" 
              animation="fast"
              pressStyle={{
                scale: 0.975,
              }} 
              icon={<Icon size={31} icon="gear" color={color} />} 
            />
          </XStack>
        </YStack>
      </Animated.View>
  )
}