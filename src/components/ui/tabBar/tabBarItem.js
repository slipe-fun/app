import { useEffect } from "react";
import Icon from "../icon";
import { useTheme, Text, Button } from "tamagui";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  interpolateColor,
  useAnimatedProps,
  withSpring,
} from "react-native-reanimated";
import { ROUTES_TITLES } from "@constants/routes";
import { useTranslation } from "react-i18next";

const AnimatedText = Animated.createAnimatedComponent(Text);

const icons = {"tab_blogs": "rectangle.columns", "tab_search": "magnifyingglass", "tab_profile": "person"}

const TabBarItem = ({ route, isFocused, onPress }) => {
  const colorValue = useSharedValue(0);
  const { t } = useTranslation();
  const theme = useTheme();
  const inactiveColor = theme.secondaryText.get();
  const activeColor = theme.primary.get();

  const textAnimatedStyles = useAnimatedStyle(() => {
    return {
      color: interpolateColor(
        colorValue.value,
        [0, 1],
        [inactiveColor, activeColor]
      ),
    };
  });

  const iconColorProps = useAnimatedProps(() => ({
    fill: interpolateColor(
      colorValue.value,
      [0, 1],
      [inactiveColor, activeColor]
    ),
  }));

  useEffect(() => {
    colorValue.value = withSpring(isFocused ? 1 : 0, {
      mass: 0.3,
      damping: 16,
      stiffness: 120,
    });
  }, [isFocused, colorValue]);

  return (
    <Button
      pressStyle={{
        opacity: 0.9,
        scale: 0.9,
      }}
      flex={1}
      gap="$0.5"
      unstyled
      backgroundColor="$transparent"
      justifyContent="center"
      alignItems="center"
      onPress={onPress}
    >
      <Icon color={inactiveColor} icon={icons[route.name]} size={28} animatedProps={iconColorProps} />
      <AnimatedText fz="$0.75" fw="$3" lh="$0.75" style={textAnimatedStyles}>
        {t(`navigation.${route.name}`)}
      </AnimatedText>
    </Button>
  );
};

export default TabBarItem;
