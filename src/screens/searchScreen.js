import { YStack, View } from "tamagui";
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
} from "react-native-reanimated";
import { SearchHeader } from "../components/common/searchScreen/header/default";
import { SearchAnimatedHeader } from "../components/common/searchScreen/header/animated";
import Hints from "@components/common/searchScreen/searchContent/hints";
import { FlashList } from "@shopify/flash-list";
import { categories } from "@constants/categories";
import Category from "../components/common/searchScreen/category";
import useSearchStore from "@stores/searchScreen";
import { useEffect } from "react";

const AnimatedFlashList = Animated.createAnimatedComponent(FlashList);

export function SearchScreen() {
  const scrollY = useSharedValue(0);

  const setIsFocused = useSearchStore((state) => state.setIsFocused);

  const onScroll = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  const renderItem = ({ item, index }) => (
    <View style={{ flex: 1, margin: 8 }}>
      <Category category={item} colIndex={index % 2} />
    </View>
  );

  useEffect(() => {
    return () => {
      setIsFocused(false);
    };
  }, []);

  return (
    <YStack f={1} backgroundColor="$black">
      <SearchAnimatedHeader scrollY={scrollY} />

      <AnimatedFlashList
        data={categories}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
        numColumns={2}
        initialNumToRender={10}
        maxToRenderPerBatch={6}
        ListHeaderComponent={<SearchHeader scrollY={scrollY} />}
        estimatedItemSize={131}
        contentContainerStyle={{
          paddingHorizontal: 8,
        }}
        columnWrapperStyle={{
          marginBottom: 24,
        }} 
        scrollEventThrottle={16}
        onScroll={onScroll}
      />
      <Hints />
    </YStack>
  );
}

export default SearchScreen;
