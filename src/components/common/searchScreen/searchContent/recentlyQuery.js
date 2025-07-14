import { View, Text, getVariableValue, useTheme } from "tamagui";
import Icon from "@components/ui/icon";
import Animated from "react-native-reanimated";
import { getFadeIn, getFadeOut } from "@constants/fadeAnimations";
import { useCallback } from "react";
import * as Haptics from "expo-haptics";

const yellow = getVariableValue("$yellow", "color");
const AnimatedView = Animated.createAnimatedComponent(View);

const RecentlyQuery = ({ isHint, result, index }) => {
  const theme = useTheme();
  const color = theme.color.get();

  const handlePress = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
  }, []);

  return (
    <AnimatedView
      flexDirection="row"
      gap="$5.5"
      exiting={getFadeOut(index)}
      entering={getFadeIn(index)}
      alignItems="center"
      pressStyle={{
        scale: 0.98,
        opacity: 0.9,
      }}
      backgroundColor="$backgroundTransparent"
      p="$5.5"
      w="$full"
      br="$7"
      onPress={handlePress}
    >
      <View
        w="$11"
        h="$11"
        justifyContent="center"
        alignItems="center"
        br="$full"
        backgroundColor={yellow + 59}
      >
        <Icon icon="lamp" size={24} color={yellow} />
      </View>
      <Text f={1} textAlign="left" fz="$2" lh="$2" fw="$3" color={color}>
        {result}
      </Text>
      <View
        w="$11"
        h="$11"
        justifyContent="center"
        opacity={0.35}
        alignItems="center"
      >
        <Icon icon="arrowUpRight" size={24} color={color} />
      </View>
    </AnimatedView>
  );
};

export default RecentlyQuery;
