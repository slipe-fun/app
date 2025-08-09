import { Text, YStack, XStack } from "tamagui";
import Animated, { LinearTransition } from "react-native-reanimated";
import { getCharEnter, getCharExit } from "@constants/fadeAnimations";
import { fastSpring } from "@constants/easings";
import { useTranslation } from "react-i18next";
import useAuthStore from "@stores/authScreen";

const AnimatedText = Animated.createAnimatedComponent(Text);

const AuthAnimatedTitle = ({ text }) => {
  const { t } = useTranslation();
  const footerHeight = useAuthStore((state) => state.footerHeight);

  return (
    <YStack
      f={1}
      ph="$7"
      w="$full"
      justifyContent="center"
      pb={footerHeight}
      gap={8}
    >
      <Text fz="$9" lh="$9" w="$full" textAlign="center" fw="$3" color="white" opacity={0.7} ta="center">
        {t("auth.welcome_subtitle")}
      </Text>

      <XStack
        w="$full"
        justifyContent="center"
        alignItems="center"
        flexWrap="wrap"
      >
        {t(`auth.welcome_${text}`)
          .split("")
          .map((char, i) => (
            <AnimatedText
              key={`${char}-${i}`}
              fz={40}
              lh={48}
              fw="$3"
              color="white"
              entering={getCharEnter(i)}
              exiting={getCharExit(i)}
              layout={LinearTransition.springify()
                .mass(fastSpring.mass)
                .damping(fastSpring.damping)
                .stiffness(fastSpring.stiffness)}
            >
              {char}
            </AnimatedText>
          ))}
      </XStack>
    </YStack>
  );
};

export default AuthAnimatedTitle; 
