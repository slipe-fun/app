import { useCallback, useRef, useEffect, useState } from "react";
import Animated, {
  useSharedValue,
  withSpring,
  useAnimatedStyle,
} from "react-native-reanimated";
import { View, XStack, Text, Input, useTheme, Button } from "tamagui";
import Icon from "../../../ui/icon";
import { useKeyboard } from "@react-native-community/hooks";

const AnimatedView = Animated.createAnimatedComponent(View);

const SearchBar = ({ isButton = false, setIsFocused, isFocused }) => {
  const theme = useTheme();
  const ref = useRef();
  const inputRef = useRef();
  const color = theme.secondaryText.get();
  const primary = theme.primary.get();
  const [cancelWidth, setCancelWidth] = useState(0);
  const cancelOpacity = useSharedValue(0);
  const cancelMarginRight = useSharedValue(0);
  const keyboard = useKeyboard();

  const cancelStyle = useAnimatedStyle(() => ({
    marginRight: -cancelMarginRight.value,
    opacity: cancelOpacity.value,
  }));

  const onCancelPressed = useCallback((type) => {
    setIsFocused(type === "cancel" ? false : true);
    if (type === "cancel") {
      inputRef.current?.blur();
    } else {
      inputRef.current?.focus()
    }
  }, []);

  useEffect(() => {
    if (keyboard.keyboardShown) {
      setIsFocused(true);
    } else {
      setIsFocused(false);
    }
  }, [keyboard]);

  useEffect(() => {
    if (cancelWidth === 0) return;

    cancelMarginRight.value = withSpring(isFocused ? 0 : cancelWidth + 16, {
      mass: 0.4,
      damping: 18,
      stiffness: 140,
      overshootClamping: false,
      restDisplacementThreshold: 0.1,
      restSpeedThreshold: 0.1,
    });

    cancelOpacity.value = withSpring(isFocused ? 1 : 0, {
      mass: 0.3,
      damping: 16,
      stiffness: 120,
    });
  }, [isFocused, cancelWidth]);

  useEffect(() => {
    setCancelWidth(ref.current?.getBoundingClientRect()?.width);
  }, []);

  return (
    <XStack width="$full" gap="$6" alignItems="center">
      <XStack
        flex={1}
        onPress={() => onCancelPressed("focus")}
        alignItems="center"
        backgroundColor="$backgroundTransparent"
        br="$full"
        h="$13"
      >
        <View
          gap="$4"
          width="$full"
          flex={1}
          flexDirection="row"
          ph="$4"
          pr="$0"
          alignItems="center"
        >
          <Icon size={22} icon="search" color={color} />
          <Input
            ref={inputRef}
            fz="$2"
            f={1}
            indicatorColor={color}
            placeholder="Поиск по вселенной"
            placeholderTextColor={color}
            p="$0"
            borderWidth="$0"
            fw="$3"
            h="$13"
          />
        </View>
        {isButton && (
          <Button
            backgroundColor="$transparent"
            width="$13"
            alignItems="center"
            justifyContent="center"
            height="$13"
            right="0"
          >
            <Icon size={24} icon="gear" color={primary} />
          </Button>
        )}
      </XStack>

      <AnimatedView style={cancelStyle}>
        <Button
          backgroundColor="$transparent"
          alignItems="center"
          ref={ref}
          p="$0"
          height="auto"
          onPress={() => onCancelPressed("cancel")}
        >
          <Text fz="$4" lh="$4" fw="$2" color="$primary">
            Отмена
          </Text>
        </Button>
      </AnimatedView>
    </XStack>
  );
};

export default SearchBar;
