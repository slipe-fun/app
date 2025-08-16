import { View, YStack } from "tamagui";
import { useState, useEffect } from "react";
import { useSharedValue, runOnJS, withSpring } from "react-native-reanimated";
import { normalSpring } from "@constants/easings";
import { authTexts } from "@constants/authTexts";
import AuthBackground from "@components/common/authScreen/welcome/background";
import AuthAnimatedTitle from "@components/common/authScreen/welcome/animatedTitle";
import Icon from "@components/ui/icon";
import useInsets from "@hooks/ui/useInsets";
import AuthFooter from "@components/common/authScreen/footer";

const AuthWelcomeScreen = ({ navigation }) => {
  const [slideIndex, setSlideIndex] = useState(0);
  const opacity = useSharedValue(1);
  const insets = useInsets();

  const updateSlideIndex = () => {
    setSlideIndex((prev) => (prev === authTexts.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      opacity.value = withSpring(0, normalSpring, (isFinished) => {
        if (isFinished) {
          runOnJS(updateSlideIndex)();
          opacity.value = withSpring(1, normalSpring);
        }
      });
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <YStack flex={1} backgroundColor="$bg">
      <View
        position="absolute"
        top={insets.top}
        alignItems="center"
        zIndex="$1"
        left={0}
        right={0}
      >
        <Icon icon="logo" size={56} />
      </View>
      <AuthBackground opacity={opacity} image={authTexts[slideIndex][1]} />
      <AuthAnimatedTitle text={authTexts[slideIndex][0]} />
      <AuthFooter navigation={navigation} welcome active nextRoute={1}/>
    </YStack>
  );
};

export default AuthWelcomeScreen;
