import { Button, getVariableValue, Text, View } from "tamagui";
import useInsets from "@hooks/ui/useInsets";
import useAuthStore from "@stores/authScreen";
import { useCallback, useEffect, useState } from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  interpolateColor,
  withSpring,
} from "react-native-reanimated";
import { ROUTES } from "@constants/routes"; 
import { useTranslation } from "react-i18next";
import { fastSpring } from "@constants/easings";

const AnimatedButton = Animated.createAnimatedComponent(Button);
const AnimatedText = Animated.createAnimatedComponent(Text);

const white = getVariableValue("$white", "color");
const primary = getVariableValue("$primary", "color");
const black = getVariableValue("$black", "color");

const routes = [
  ROUTES.AUTH_WELCOME,
  ROUTES.AUTH_USERNAME,
  ROUTES.AUTH_PASSWORD,
  ROUTES.AUTH_AVATAR,
  ROUTES.AUTH_FINISH,
];

const AuthFooter = ({ navigation }) => {
    const insets = useInsets();
    const { t } = useTranslation();
    const [activeIndex, setActiveIndex] = useState(0);
    const color = useSharedValue(activeIndex === 0 ? 0 : 1);
    const setFooterHeight = useAuthStore((state) => state.setFooterHeight);
  
    const handleLayout = useCallback((e) => {
      setFooterHeight(e.nativeEvent.layout.height);
    }, []);
  
    const animatedStyle = useAnimatedStyle(() => ({
      backgroundColor: interpolateColor(color.value, [0, 1], [white, primary]),
    }));
  
    const AnimatedTextStyle = useAnimatedStyle(() => ({
      color: interpolateColor(color.value, [0, 1], [black, white]),
    }));
  
    const handlePress = () => {
      setActiveIndex(prev => prev === routes.length - 1 ? 0 : prev + 1);
    };

    useEffect(() => {
      color.value = withSpring(activeIndex === 0 ? 0 : 1, fastSpring);
      navigation.navigate('auth', { screen: routes[activeIndex] });
    }, [activeIndex]);
  
    return (
      <View
        position="absolute"
        bottom={0}
        onLayout={handleLayout}
        left={0}
        right={0}
        pt="$7"
        ph="$7"
        pb={insets.bottom}
      >
        <AnimatedButton
          h="$13"
          br="$full"
          onPress={handlePress}
          style={animatedStyle}
          justifyContent="center"
          alignItems="center"
        >
          <AnimatedText fz="$3" lh="$3" fw="$3" style={AnimatedTextStyle}>
            {t("auth.footer_button")}
          </AnimatedText>
        </AnimatedButton>
      </View>
    );
  };
  
  export default AuthFooter;
  
