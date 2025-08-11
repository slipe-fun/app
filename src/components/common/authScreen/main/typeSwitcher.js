import { View } from "tamagui";
import Animated, {
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { fastSpring } from "@constants/easings";
import Icon from "@components/ui/icon";
import { useTheme } from "tamagui";

const AnimatedView = Animated.createAnimatedComponent(View);

const AuthTypeSwitcher = ({ visible, setType, type, ...props }) => {
  const theme = useTheme();

  const color = theme.color.get();

  const containerStyle = useAnimatedStyle(
    () => ({
      opacity: withSpring(visible ? 1 : 0, fastSpring),
      transform: [{ scale: withSpring(visible ? 1 : 0.9, fastSpring) }],
    }),
    [visible]
  );

  return (
    <AnimatedView
      style={containerStyle}
      onPress={() => setType(prev => !prev)}
      {...props}
    >
      {type ? (
        <Icon icon="eye" size={24} color={color} />
      ) : (
        <Icon icon="eye.slash" size={24} color={color} />
      )}
    </AnimatedView>
  );
};

export default AuthTypeSwitcher;
