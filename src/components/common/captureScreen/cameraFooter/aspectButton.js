import useCaptureStore from "@stores/captureScreen";
import { View, Text } from "tamagui";
import { memo } from "react";
import { GradientBorder } from "@components/ui/gradientBorder";
import * as Haptics from "expo-haptics";

import Animated, { FadeInUp, FadeOutDown } from "react-native-reanimated";
import { fastSpring } from "@constants/easings";

const AnimatedText = Animated.createAnimatedComponent(Text);
const AnimatedView = Animated.createAnimatedComponent(View);

const AspectButton = () => {
  const aspect = useCaptureStore((s) => s.aspect);
  const formatIdx = useCaptureStore((s) => s.format);
  const setAspect = useCaptureStore((s) => s.setAspect);

  const displayAspect = aspect ? "4:3" : "16:9";

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
    setAspect(!aspect);
  };

  return (
    <AnimatedView
      flex={1}
      pointerEvents={formatIdx === 1 ? "auto" : "none"}
      justifyContent="center"
      alignItems="center"
    >
      <GradientBorder
        w="$13"
        h="$13"
        br="$full"
        backgroundColor="$glassButtonDark"
        isButton
        onPress={handlePress}
        textAlign="center"
        justifyContent="center"
        alignItems="center"
        position="relative"
        overflow="hidden"
        flexDirection="row"
      >
        <View
          flexDirection="row"
          justifyContent="center"
          position="absolute"
          alignItems="center"
          w="$13"
          h="$13"
        >
          {displayAspect.split("")?.map((char, index) => (
            <AnimatedText
              key={`${char}-${index}`}
              fz="$2"
              lh="$2"
              fw="$3"
              color="white"
              entering={FadeInUp.springify()
                .damping(fastSpring.damping)
                .mass(fastSpring.mass + index * 0.2)
                .stiffness(fastSpring.stiffness)}
              exiting={FadeOutDown.springify()
                .damping(fastSpring.damping)
                .mass(fastSpring.mass + index * 0.2)
                .stiffness(fastSpring.stiffness)}
            >
              {char}
            </AnimatedText>
          ))}
        </View>
      </GradientBorder>
    </AnimatedView>
  );
};

export default memo(AspectButton);
