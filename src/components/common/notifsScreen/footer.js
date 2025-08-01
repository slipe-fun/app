import { LinearGradient } from "expo-linear-gradient";
import { View, Text } from "tamagui";
import useInsets from "@hooks/ui/useInsets";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { quickSpring } from "@constants/easings";
import * as Haptics from 'expo-haptics';
import { GradientBorder } from "@components/ui/gradientBorder";
import { useRef, useEffect } from "react";
import useNotifsStore from "@stores/notifsScreen";
import { useTranslation } from "react-i18next";

const AnimatedGradientBorder = Animated.createAnimatedComponent(GradientBorder);

const NotifsFooter = ({ count }) => {
  const insets = useInsets();
  const { t } = useTranslation();

  const scale = useSharedValue(1);

  const setFooterHeight = useNotifsStore((state) => state.setFooterHeight);

  const footerRef = useRef(null);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
    scale.value = withSpring(1.05, quickSpring);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, quickSpring);
  };

  useEffect(() => {
    setFooterHeight(footerRef.current?.getBoundingClientRect()?.height);
  }, []);

  return (
    <View
      position="absolute"
      justifyContent="center"
      alignItems="center"
      bottom={0}
      ref={footerRef}
      left={0}
      pt="$6"
      ph="$6"
      pb={insets.bottom}
      right={0}
      zIndex="$1"
    >
      <LinearGradient
        colors={["#00000000", "#000"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
        }}
      />
      <AnimatedGradientBorder
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        isButton
        h="$13"
        br="$full"
        backgroundColor="$glassButton"
        ph="$7.5"
        justifyContent="center"
        alignItems="center"
        style={animatedStyle}
      >
        <Text color="$color" fw="$3" fz="$4" lh="$4">
         {t('notifications.new', { count })}
        </Text>
      </AnimatedGradientBorder>
    </View>
  );
};

export default NotifsFooter;
