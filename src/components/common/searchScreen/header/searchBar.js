import React, { useRef, useEffect } from 'react';
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
} from 'react-native-reanimated';
import { View, XStack, Text, Input, useTheme, Button } from 'tamagui';
import Icon from '../../../ui/icon';

const AnimatedXStack = Animated.createAnimatedComponent(XStack);
const AnimatedView = Animated.createAnimatedComponent(View);

const SearchBar = ({ isButton = false, setIsFocused, isFocused }) => {
  const theme = useTheme();
  const inputRef = useRef();
  const color = theme.secondaryText.get();
  const primary = theme.primary.get();

  const cancelOpacity = useSharedValue(0);
  const inputWidth = useSharedValue(1);

  useEffect(() => {
    if (isFocused) {
      inputWidth.value = withTiming(0.8, { duration: 200, easing: Easing.inOut(Easing.ease) });
      cancelOpacity.value = withTiming(1, { duration: 200 });
    } else {
      inputWidth.value = withTiming(1, { duration: 200, easing: Easing.inOut(Easing.ease) });
      cancelOpacity.value = withTiming(0, { duration: 200 });
    }
  }, [isFocused]);

  const inputStyle = useAnimatedStyle(() => ({
    width: `${inputWidth.value * 100}%`,
  }));
  const cancelStyle = useAnimatedStyle(() => ({
    opacity: cancelOpacity.value,
  }));

  return (
    <XStack width="$full" gap="$6" alignItems="center">
      <AnimatedXStack
        style={inputStyle}
        onPress={() => {
          setIsFocused(true);
          inputRef.current?.focus();
        }}
        alignItems="center"
        backgroundColor="$backgroundTransparent"
        br="$4"
        h="$13"
      >
        <AnimatedView
          gap="$4"
          flex={1}
          flexDirection="row"
          ph="$4"
          pr="$0"
          alignItems="center"
        >
          <Icon size={22} icon="search" color={color} />
          <Input
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            ref={inputRef}
            fz="$2"
            flex={1}
            placeholder="Поиск по вселенной"
            placeholderTextColor={color}
            p="$0"
            borderWidth="$0"
            fw="$3"
            h="$13"
          />
        </AnimatedView>
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
      </AnimatedXStack>

      <AnimatedView style={cancelStyle}>
        <Button
          backgroundColor="$transparent"
          alignItems="center"
          p="$0"
          height="auto"
          onPress={() => {
            setIsFocused(false);
            inputRef.current?.blur();
          }}
        >
          <Text fz="$4" lh="$4" fw="$3" color="$primary">
            Cancel
          </Text>
        </Button>
      </AnimatedView>
    </XStack>
  );
};

export default SearchBar;
