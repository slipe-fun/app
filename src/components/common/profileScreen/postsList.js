import { FlashList } from "@shopify/flash-list";
import useFetchProfilePosts from "@hooks/useFetchProfilePosts";
import PublishButton from "@components/common/profileScreen/publishButton";
import Post from "@components/ui/post";
import { useCallback } from "react";
import ProfileInfoBlock from "@components/common/profileScreen/infoBlock";
import { Dimensions } from "react-native";
import Animated, { useAnimatedScrollHandler } from "react-native-reanimated";

const { width } = Dimensions.get("window");
const AnimatedFlashList = Animated.createAnimatedComponent(FlashList);

const ProfilePostsList = ({ scrollY, actionsHeight, viewHeight, user }) => {
  const { posts, setPage } = useFetchProfilePosts(user?.id, true);

  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const renderItem = useCallback(({ item }) => {
    switch (item?.type) {
      case "publish":
        return <PublishButton key={item?.id} />;
      default:
        return <Post post={item} />;
    }
  }, []);

  const handleEndReached = useCallback(() => {
    setPage((prev) => prev + 1);
  }, []);

  return (
    <AnimatedFlashList
      keyExtractor={(item) => item?.id?.toString()}
      contentContainerStyle={{
        paddingTop: width + actionsHeight,
        paddingHorizontal: 8,
      }}
      ListHeaderComponent={<ProfileInfoBlock user={user} />}
      data={posts}
      scrollEventThrottle={16}
      optimizeItemArrangement={false}
      numColumns={2}
      initialNumToRender={4}
      maxToRenderPerBatch={12}
      estimatedListSize={{ width: width, height: width - viewHeight }}
      onEndReached={handleEndReached}
      overScrollMode="never"
      onScroll={onScroll}
      renderItem={renderItem}
      estimatedItemSize={250}
    />
  );
};

export default ProfilePostsList;
