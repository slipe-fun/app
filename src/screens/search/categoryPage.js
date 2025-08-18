import { View } from "tamagui";
import { Dimensions } from "react-native";
import CategoryPageHeader from "@components/common/searchScreen/categoryPage/header";
import { FlashList } from "@shopify/flash-list";
import Post from "@components/ui/post";
import useFetchCategoryPosts from "@hooks/useFetchCategoryPosts";
import { useCallback } from "react";
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler, 
} from "react-native-reanimated";
import useSearchStore from "@stores/searchScreen";

const AnimatedFlashList = Animated.createAnimatedComponent(FlashList);

const { width } = Dimensions.get("window");
const headerHeight = width * 0.8;

const CategoryPage = ({ route }) => {
  const { category } = route.params;
  const scrollY = useSharedValue(0);

  const { posts, setPage, setPosts } = useFetchCategoryPosts(category?.name?.toLowerCase());

  const onScroll = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  const renderItem = useCallback(({ item, index }) => (
    <Post key={`${item.id}-${index}`} post={item} width={(width - 48) / 2} setPosts={setPosts} />
  ), []);

  const handleEndReached = useCallback(() => {
    setPage((prev) => prev + 1);
  }, []);

  return (
    <View f={1} backgroundColor="$black">
        <CategoryPageHeader category={category} scrollY={scrollY} />
      <AnimatedFlashList
        contentContainerStyle={{ paddingTop: headerHeight + 8, paddingHorizontal: 8, }}
        data={category?.isSlides ? category?.posts : posts}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        extraData={category?.isSlides}
        estimatedListSize={250}
        masonry
        onScroll={onScroll}
        initialNumToRender={8}
        maxToRenderPerBatch={12}
        scrollEventThrottle={16}
        renderItem={renderItem}
        onEndReached={category?.isSlides ? null : handleEndReached}
      />
    </View>
  );
}

export default CategoryPage;

