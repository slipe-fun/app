import Icon from "@components/ui/icon";
import { Button, Text, View, getVariableValue } from "tamagui";
import * as Haptics from "expo-haptics";
import { memo, useCallback, useEffect } from "react";
import Animated, {
  useAnimatedStyle,
  useAnimatedRef,
  interpolate,
} from "react-native-reanimated";
import { Dimensions } from "react-native";

const buttons = [
  { id: "edit", icon: "edit", label: "Изм." },
  { id: "notifications", icon: "notifications", label: "Увед." },
  { id: "settings", icon: "gear", label: "Настр." },
  { id: "more", icon: "menu", label: "Ещё" },
];

const iconColor = getVariableValue("$white", "color");
const { width } = Dimensions.get("window");
const AnimatedView = Animated.createAnimatedComponent(View);

const ProfileActions = ({ actionsHeight, setActionsHeight, scrollY, viewHeight, averageColor }) => {
  const ref = useAnimatedRef();
  
  const handlePress = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
  }, []);

  const animatedViewStyle = useAnimatedStyle(() => {
    if (actionsHeight < 30) return {};

    const height = interpolate(scrollY.value, [width - viewHeight, width], [actionsHeight, 0], 'clamp');

    return { height };

  }, [actionsHeight]);

  const animatedInnerViewStyle = useAnimatedStyle(() => {
    const t = interpolate(scrollY.value, [width - viewHeight, width], [1, 0], 'clamp');

    return {
      opacity: t, 
      transform: [{ scale: t }],
    };
  }, [actionsHeight]);

  useEffect(() => {
    setActionsHeight(ref.current?.getBoundingClientRect()?.height);
  }, []);

  return (
    <AnimatedView
      ref={ref}
      style={animatedViewStyle}
      backgroundColor={`rgba(${averageColor}, 1)`}
      w="$full"
      ph="$6"
      flexDirection="row"
      gap="$3"
    >
      {buttons.map((button) => (
        <Button
          pressStyle={{
            scale: 0.98,
            opacity: 0.9,
          }}
          onPress={handlePress}
          animation="fast"
          mb="$5"
          mt="$1"
          key={button.id}
          backgroundColor="$glassButton"
          overflow="hidden"
          unstyled
          f={1}
          position="relative"
        >
          <AnimatedView
            br="$5"
            pt="$2"
            justifyContent="center"
            alignItems="center"
            pb="$3"
            gap="$0.5"
            transformOrigin="center"
            f={1}
            style={animatedInnerViewStyle}
          >
            <Icon color={iconColor} icon={button.icon} size={24} />
            <Text w="$full" lh="$0.75" fw="$2" fz="$0.75">
              {button.label}
            </Text>
          </AnimatedView>
        </Button>
      ))}
    </AnimatedView>
  );
};

export default memo(ProfileActions);
