import { useState, useCallback, useRef } from "react";
import { YStack, Separator, Text } from "tamagui";
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedRef,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Platform, View } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { NotifsDefaultHeader } from "../components/common/notifsScreen/header/default";
import { NotifsAnimatedHeader } from "../components/common/notifsScreen/header/animated";
import Notification from "../components/common/notifsScreen/notification";
import { useFetchNotifications } from "../hooks/useFetchNotifications";

const AnimatedFlashList = Animated.createAnimatedComponent(FlashList);

const NotificationsList = ({ notifications }) => {
  return (
    <YStack gap="$6" mt="$5" ph="$6">
      <Notification notification={notifications.item} />
      {notifications.index < notifications.data.length - 1 && (
        <Separator
          borderRadius="$full"
          borderBottomWidth={2}
          borderColor="$separator"
          marginLeft={60}
        />
      )}
    </YStack>
  );
};

export function NotifsScreen() {
  const scrollY = useSharedValue(0);
  const insets = useSafeAreaInsets();
  const { notifications, addPage } = useFetchNotifications();
  const listRef = useAnimatedRef();

  const onScroll = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  const onEndReached = useCallback(() => {
    addPage();
  }, [addPage]);

  const renderItem = useCallback(({ item, index }) => (
    <NotificationsList
      notifications={{
        item,
        index,
        data: notifications
      }}
    />
  ), [notifications]);

  const ListHeaderComponent = useCallback(() => (
    <NotifsDefaultHeader scrollY={scrollY} />
  ), []);

  const keyExtractor = useCallback((item) => item.id || Math.random().toString(), []);

  const getItemType = useCallback((item) => {
    return item.type || 'default';
  }, []);

  return (
    <YStack f={1} backgroundColor="$black">
      <NotifsAnimatedHeader scrollY={scrollY} />
      
      <AnimatedFlashList
        ref={listRef}
        data={notifications}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        onScroll={onScroll}
        scrollEventThrottle={16}
        contentContainerStyle={{
          paddingTop: Platform.OS === "ios" ? insets.top : insets.top,
        }}
        estimatedItemSize={100}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.5}
        ListHeaderComponent={ListHeaderComponent}
        getItemType={getItemType}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews={true}
        updateCellsBatchingPeriod={50}
        maxToRenderPerBatch={10}
        windowSize={11}
        initialNumToRender={10}
      />
    </YStack>
  );
}

export default NotifsScreen;