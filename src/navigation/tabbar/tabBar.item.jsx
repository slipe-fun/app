import { useEffect } from "react";
import Icon from "@components/ui/icon";
import { useTheme, Button } from "tamagui";
import {
  useSharedValue,
  interpolateColor,
  useAnimatedProps,
  withSpring,
} from "react-native-reanimated";

const icons = {
  tab_blogs: "rectangle.columns",
  tab_search: "magnifyingglass",
  tab_profile: "person",
};

export default function TabBarItem({ route, isFocused, onPress }) {
  const colorValue = useSharedValue(0);
  const theme = useTheme();
  const inactiveColor = theme.secondaryText.get();
  const activeColor = theme.primary.get();

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
      <Icon
        color={inactiveColor}
        icon={icons[route.name]}
        size={28}
        animatedProps={iconColorProps}
      />
    </Button>
  );
}
