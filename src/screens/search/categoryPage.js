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

const AnimatedFlashList = Animated.createAnimatedComponent(FlashList);

const { width } = Dimensions.get("window");

const CategoryPage = ({ route }) => {
  const { category } = route.params;
  const scrollY = useSharedValue(0);

  const { posts, setPage } = useFetchCategoryPosts(category?.name?.toLowerCase());

  const onScroll = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  const renderItem = useCallback(({ item }) => (
    <Post post={item} width={(width - 48) / 2} />
  ), []);

  const handleEndReached = useCallback(() => {
    setPage((prev) => prev + 1);
  }, []);

  return (
    <View f={1} backgroundColor="$black">
      {/* <View position="absolute" top={0} left={0} right={0} zIndex={1}>
        <CategoryPageHeader category={category} scrollY={scrollY} />
      </View> */}
      <AnimatedFlashList
        contentContainerStyle={{ paddingTop: 20, paddingHorizontal: 8, }}
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        masonry
        initialNumToRender={8}
        maxToRenderPerBatch={12}
        scrollEventThrottle={16}
        renderItem={renderItem}
        onEndReached={handleEndReached}
      />
    </View>
  );
}

export default CategoryPage;

