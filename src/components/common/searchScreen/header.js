import { getVariableValue } from "tamagui";
import Animated, {
  useAnimatedStyle,
  interpolate,
} from "react-native-reanimated";
import { YStack, XStack, Text, Button } from "tamagui";
import Icon from "../../ui/icon";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Platform } from "react-native";

const AnimatedXStack = Animated.createAnimatedComponent(XStack);

export const SearchHeader = ({ scrollY }) => {
  const color = getVariableValue("$primary", "color");
  const insets = useSafeAreaInsets();

  const HeaderTitleStyle = useAnimatedStyle(() => {
    const t = scrollY.value;
    const opacity = interpolate(t, [0, 60], [1, 0], "clamp");
    const translateY = interpolate(t, [0, 60], [0, -10], "clamp");
    return {
      opacity,
      transform: [{ translateY }],
    };
  });

  return (
    <YStack pt={Platform.OS === "ios" ? insets.top : insets.top + 10} pb="$4">
      <AnimatedXStack style={HeaderTitleStyle} ph="$6" justifyContent="space-between" alignItems="center">
        <Text color="$color" lh="$9" fw="$3" fz="$9">
          Search
        </Text>
        <Button
          p={0}
          width="$11"
          height="$11"
          br="$full"
          animation="fast"
          backgroundColor="$backgroundTransparent"
          pressStyle={{
            scale: 0.9,
          }}
          icon={<Icon size={24} icon="gear" color={color} />}
        />
      </AnimatedXStack>
    </YStack>
  );
};
