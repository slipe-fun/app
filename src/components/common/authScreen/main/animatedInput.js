import { useRef, useEffect } from "react";
import { Input, View } from "tamagui";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { fastSpring } from "@constants/easings";
import { useTranslation } from "react-i18next";

const AnimatedInput = Animated.createAnimatedComponent(Input);

const AuthAnimatedInput = ({
  value,
  onChangeText,
  placeholder,
  onFocus,
  onBlur,
  action,
  ...props
}) => {
  const inputRef = useRef(null);
  const width = useSharedValue(0);
  const initialWidth = useSharedValue(0);
  const { t } = useTranslation();
  const fullWidth = useSharedValue(0);

  const handleFocus = () => {
    onFocus?.();
    if (fullWidth.value) {
      width.value = withSpring(fullWidth.value, fastSpring);
    }
  };

  const handleBlur = () => {
    onBlur?.();
    if (!value) {
      width.value = withSpring(initialWidth.value, fastSpring);
    }
  };

  const animatedStyle = useAnimatedStyle(() => ({
    width: width.value || undefined,
  }));

  useEffect(() => {
    const w = inputRef.current?.getBoundingClientRect()?.width;
    initialWidth.value = w;
    width.value = w;
  }, []);

  return (
    <View
      h="$13"
      onPress={() => inputRef.current?.focus()}
      onLayout={(e) => (fullWidth.value = e.nativeEvent.layout.width)}
      justifyContent="center"
      alignItems="center"
      overflow="hidden"
      position="relative"
      br="$full"
      ph="$6"
      backgroundColor="$backgroundTransparent"
    >
      <AnimatedInput
        ref={inputRef}
        style={animatedStyle}
        onFocus={handleFocus}
        key={placeholder}
        onBlur={handleBlur}
        onChangeText={onChangeText}
        value={value}
        placeholder={t(`auth.${placeholder}`)}
        placeholderTextColor="$secondaryText"
        color="$color"
        fz="$2"
        fw="$2"
        lh="$2"
        ph="$6"
        borderWidth={0}
        backgroundColor="transparent"
        {...props}
      />
      {action}
    </View>
  );
};

export default AuthAnimatedInput;
