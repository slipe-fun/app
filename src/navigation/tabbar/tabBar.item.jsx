import { useEffect } from "react";
import Icon from "@components/ui/icon";
import { useTheme, Button } from "tamagui";
import Animated, {
  useSharedValue,
  withSpring,
  useAnimatedStyle,
} from "react-native-reanimated";
import { normalSpring } from "@constants/easings";

const icons = {
  tab_blogs: "rectangle.columns",
  tab_search: "magnifyingglass",
  tab_profile: "person",
};

const AnimatedButton = Animated.createAnimatedComponent(Button);

export default function TabBarItem({ route, isFocused, onPress }) {
  const colorValue = useSharedValue(0);
  const theme = useTheme();
  const inactiveColor = theme.color.get();

  const scale = useSharedValue(1);

  const buttonOpacityStyle = useAnimatedStyle(() => ({
    opacity: colorValue.value,
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.85, normalSpring);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, normalSpring);
  };

  useEffect(() => {
    colorValue.value = withSpring(isFocused ? 1 : 0.5, normalSpring);
  }, [isFocused]);

  return (
    <AnimatedButton
      style={buttonOpacityStyle}
      flex={1}
      h="$12.5"
      zIndex="$2"
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      unstyled
      backgroundColor="$transparent"
      justifyContent="center"
      alignItems="center"
      onPress={onPress}
    >
      <Icon color={inactiveColor} icon={icons[route.name]} size={28} />
    </AnimatedButton>
  );
}
