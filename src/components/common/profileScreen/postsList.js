import { FlashList } from "@shopify/flash-list";
import useFetchProfilePosts from "@hooks/useFetchProfilePosts";
import PublishButton from "@components/common/profileScreen/publishButton";
import Post from "@components/ui/post";
import { useCallback } from "react";
import ProfileInfoBlock from "@components/common/profileScreen/infoBlock";
import Animated, { useAnimatedScrollHandler } from "react-native-reanimated";
import { YStack } from "tamagui";
import ProfileBlock from "./profileBlock";

const AnimatedFlashList = Animated.createAnimatedComponent(FlashList);

const ProfilePostsList = ({ scrollY, user, isScreen }) => {

  const { posts, setPage } = useFetchProfilePosts(user?.id, !isScreen);

  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const renderItem = useCallback(({ item }) => {
    if (item?.type === "publish" && !isScreen) {
      return <PublishButton />;
    }
    return <Post post={item} />;
  }, []);

  const handleEndReached = useCallback(() => {
    setPage((prev) => prev + 1);
  }, []);

  const keyExtractor = useCallback((item) => {
    return item?.id?.toString();
  }, []);

  return (
    <AnimatedFlashList
      keyExtractor={keyExtractor}
      contentContainerStyle={{
        paddingHorizontal: 8,
      }}
      ListHeaderComponent={
        <YStack ph="$3" pb="$3" gap="$6">
          <ProfileBlock isScreen={isScreen} scrollY={scrollY} user={user} />
          <ProfileInfoBlock user={user} />
        </YStack>
      }
      data={posts}
      scrollEventThrottle={16}
      numColumns={2}
      initialNumToRender={4}
      maxToRenderPerBatch={12}
      onEndReached={handleEndReached}
      onScroll={onScroll}
      renderItem={renderItem}
      estimatedItemSize={250}
    />
  );
};

export default ProfilePostsList;
