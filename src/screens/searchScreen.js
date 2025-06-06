import { YStack, View } from "tamagui";
import Animated, { useSharedValue, useAnimatedScrollHandler } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SearchHeader } from "../components/common/searchScreen/header";
import { Platform } from "react-native";

export function SearchScreen() {
  const scrollY = useSharedValue(0);
  const insets = useSafeAreaInsets();

  const onScroll = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  return (
    <YStack f={1} backgroundColor="$black">
      <SearchHeader scrollY={scrollY} />

      <Animated.ScrollView
        scrollEventThrottle={16}
        onScroll={onScroll}
        contentContainerStyle={{
          gap: 16,
          paddingTop: Platform.OS === "ios" ? insets.top : insets.top + 10,
        }}
      >
        {Array.from({ length: 20 }).map((_, index) => (
          <View
            backgroundColor="$primary"
            width="100%"
            height="$20"
            key={index}
          />
        ))}
      </Animated.ScrollView>
    </YStack>
  );
}

export default SearchScreen;
