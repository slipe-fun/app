import { View } from "tamagui";
import { useState, useEffect } from "react";
import { useSharedValue, runOnJS, withSpring } from "react-native-reanimated";
import { normalSpring } from "@constants/easings";
import { authTexts } from "@constants/authTexts";
import AuthBackground from "@components/common/authScreen/welcome/background";

const WelcomeScreen = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const opacity = useSharedValue(1);

  const updateSlideIndex = () => {
    setSlideIndex(prev => prev === authTexts.length - 1 ? 0 : prev + 1);
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
    <View
      flex={1}
      backgroundColor="$bg"
      alignItems="center"
      justifyContent="center"
    >
    <AuthBackground opacity={opacity} image={authTexts[slideIndex][1]} />
    </View>
  );
};

export default WelcomeScreen;
