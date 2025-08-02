import { useProfileStore } from "@stores/profileScreen";
import Icon from "@components/ui/icon";
import { Text, View, useTheme, YStack, XStack, getVariableValue  } from "tamagui";
import GetNormalDate from "@lib/getNormalDate";
import Animated, {
  useAnimatedStyle,
  interpolate,
} from "react-native-reanimated";
import { useRef, useState, useEffect } from "react";
import useInsets from "@hooks/ui/useInsets";

const AnimatedYStack = Animated.createAnimatedComponent(YStack);

const size = getVariableValue("$14", "size");
const padding = getVariableValue("$6", "space");
const buttonSize = getVariableValue("$13", "size");

const ProfileUserInfo = ({ header, scrollY }) => {
  const user = useProfileStore((state) => state.user);

  const insets = useInsets();
  const [height, setHeight] = useState(0);
  const animatedRef = useRef();

  const calculatedStartPoint = size + padding + (buttonSize / 2) + insets.top;

  const theme = useTheme();
  const iconColor = theme.color.get();

  const animatedViewStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value,
      [calculatedStartPoint, calculatedStartPoint + height],
      header ? [0, 1] : [1, 0],
      "clamp"
    );
    return {
      opacity,
    };
  });

  useEffect(() => {
    setHeight(animatedRef.current?.getBoundingClientRect()?.height);
  }, []);

  return (
    <AnimatedYStack
      ref={animatedRef}
      style={animatedViewStyle}
      f={1}
      gap={header ? "$2" : "$4"}
      alignItems="center"
    >
      <Text fz={header ? "$4" : "$7"} lh={header ? "$4" : "$7"} fw="$3">
        {user?.nickname || user?.username}
      </Text>
      <XStack alignItems="center" opacity={header ? 0.7 : 0.35} gap="$5">
        <XStack gap="$2">
          <Icon icon="person" size={17} color={iconColor} />
          <Text fz="$2" lh="$2" fw="$2" color="$color">
            {user?.followers}
          </Text>
        </XStack>
        <View br="$7" w="$0.5" h="$0.5" backgroundColor="$color" />
        <XStack gap="$2">
          <Icon icon="clock" size={17} color={iconColor} />
          <Text fz="$2" lh="$2" fw="$2" color="$color">
            {GetNormalDate(user?.date)}
          </Text>
        </XStack>
      </XStack>
    </AnimatedYStack>
  );
};

export default ProfileUserInfo;
