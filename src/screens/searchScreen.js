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
import { useEffect, useCallback } from "react";
import useFetchDataByQuery from "@hooks/useFetchDataByQuery";
import Post from "@components/ui/post";
import SearchSlider from "@components/common/searchScreen/slider";

const AnimatedFlashList = Animated.createAnimatedComponent(FlashList);

export function SearchScreen() {
  const scrollY = useSharedValue(0);

  const setIsFocused = useSearchStore((state) => state.setIsFocused);
  const type = useSearchStore((state) => state.type);
  const isFocused = useSearchStore((state) => state.isFocused);
  const isSearch = useSearchStore((state) => state.isSearch);
  const setIsSearch = useSearchStore((state) => state.setIsSearch);
  const query = useSearchStore((state) => state.query);

  const { data, setPage } = useFetchDataByQuery(isSearch ? query : "", type);

  const onScroll = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  const renderItem = useCallback(
    ({ item }) => {
      if (isSearch) {
        return <Post post={item} />;
      }
      return (
        <View style={{ flex: 1, margin: 8 }}>
          <Category category={item} />
        </View>
      );
    },
    [isSearch]
  );

  const handleEndReached = useCallback(() => {
    setPage((prev) => prev + 1);
  }, []);

  useEffect(() => {
    return () => {
      setIsFocused(false);
    };
  }, []);

  useEffect(() => {
    if (isFocused) {
      setIsSearch(false);
    }
  }, [isFocused]);

  return (
    <YStack f={1} backgroundColor="$black">
      <SearchAnimatedHeader scrollY={scrollY} />
      <AnimatedFlashList
      keyboardShouldPersistTaps="handled"
        data={isSearch ? data : categories}
        extraData={isSearch}
        onEndReached={isSearch ? handleEndReached : null}
        renderItem={renderItem}
        keyExtractor={(item, index) =>
          isSearch ? `post-${item?.id}` : `category-${index}`
        }
        numColumns={2}
        initialNumToRender={10}
        maxToRenderPerBatch={isSearch ? 12 : 6}
        ListHeaderComponent={<YStack pb="$8" gap="$10"><SearchHeader scrollY={scrollY} /><SearchSlider /></YStack>}
        estimatedItemSize={isSearch ? 250 : 131}
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
