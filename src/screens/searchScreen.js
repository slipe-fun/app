import { YStack, View } from "tamagui";
import Animated, { useSharedValue, useAnimatedScrollHandler } from "react-native-reanimated";
import { SearchHeader } from "../components/common/searchScreen/header/default";
import { SearchAnimatedHeader } from "../components/common/searchScreen/header/animated";

export function SearchScreen() {
  const scrollY = useSharedValue(0);

  const onScroll = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  return (
    <YStack f={1} backgroundColor="$black">
      <SearchAnimatedHeader scrollY={scrollY} />
      <Animated.ScrollView
        scrollEventThrottle={16}
        onScroll={onScroll}
        contentContainerStyle={{
          gap: 16,
        }}
      >
        <SearchHeader scrollY={scrollY} />
        {Array.from({ length: 10 }).map((_, index) => (
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
