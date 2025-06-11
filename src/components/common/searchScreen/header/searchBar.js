import { useRef, useEffect, useState } from "react";
import Animated, {
  useSharedValue,
  withSpring,
  useAnimatedStyle,
} from "react-native-reanimated";
import { View, XStack, Text, Input, useTheme, Button } from "tamagui";
import Icon from "../../../ui/icon";
import { BackHandler } from "react-native";

const AnimatedView = Animated.createAnimatedComponent(View);

const SearchBar = ({ isButton = false, setIsFocused, isFocused }) => {
  const theme = useTheme();
  const inputRef = useRef();
  const color = theme.secondaryText.get();
  const primary = theme.primary.get();
  const [cancelWidth, setCancelWidth] = useState(0);
  const cancelOpacity = useSharedValue(0);
  const cancelMarginRight = useSharedValue(0);

  const cancelStyle = useAnimatedStyle(() => ({
    marginRight: -cancelMarginRight.value,
    opacity: cancelOpacity.value,
  }));

  useEffect(() => {
    const onBackPress = () => {
      if (isFocused) {
        inputRef.current?.blur();
        return true;
      } else {
        return false;
      }
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      onBackPress
    );

    return () => backHandler.remove();
  }, [isFocused]);

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

  return (
    <XStack width="$full" gap="$6" alignItems="center">
      <XStack
        flex={1}
        onPress={() => {
          setIsFocused(true);
          inputRef.current?.focus();
        }}
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
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
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
          onLayout={(e) => {
            setCancelWidth(Math.round(e.nativeEvent.layout.width));
          }}
          p="$0"
          height="auto"
          onPress={() => {
            setIsFocused(false);
            inputRef.current?.blur();
          }}
        >
          <Text fz="$4" lh="$4" fw="$2" color="$primary">
            Cancel
          </Text>
        </Button>
      </AnimatedView>
    </XStack>
  );
};

export default SearchBar;
