import { Text, YStack, XStack } from "tamagui";
import Animated, { LinearTransition } from "react-native-reanimated";
import { getCharEnter, getCharExit } from "@constants/fadeAnimations";
import { fastSpring } from "@constants/easings";
import { useTranslation } from "react-i18next";

const AnimatedText = Animated.createAnimatedComponent(Text);

const AuthAnimatedTitle = ({text}) => {
    const { t } = useTranslation();

  return (
    <YStack
      f={1}
      zIndex="$2"
      ph="$7"
      gap={8}
      alignItems="center"
      justifyContent="center"
    >
      <Text fz="$9" lh="$9" fw="$3" color="white" opacity={0.7} ta="center">
        {t("welcome.subtitle")}
      </Text>

      <XStack
        w="$full"
        justifyContent="center"
        alignItems="center"
        flexWrap="wrap"
      >
        {t(`welcome.${text}`).split("").map((char, i) => (
          <AnimatedText
            key={`${char}-${i}`}
            fz={40}
            lh={48}
            fw="$3"
            color="white"
            entering={getCharEnter(i)}
            exiting={getCharExit(i)}
            layout={LinearTransition.springify().mass(fastSpring.mass).damping(fastSpring.damping).stiffness(fastSpring.stiffness)}
          >
            {char}
          </AnimatedText>
        ))}
      </XStack>
    </YStack>
  );
};

export default AuthAnimatedTitle;
