import Animated, { useAnimatedStyle, withSpring } from "react-native-reanimated";
import { Text } from "tamagui";
import { useTranslation } from "react-i18next";
import { fastSpring } from "@constants/easings";

const AnimatedText = Animated.createAnimatedComponent(Text);

const AuthTip = ({ text, shadowed }) => {
  const { t } = useTranslation();

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: withSpring(shadowed ? 0.5 : 1, fastSpring),
  }));

  return (
    <AnimatedText
      w="$full"
      textAlign="center"
      color="$secondaryText"
      fz="$2"
      fw="$2"
      style={animatedStyle}
      lh="$2"
    >
      {t(`auth.${text}`)}
    </AnimatedText>
  );
};

export default AuthTip;

