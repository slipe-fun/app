import { useCallback } from "react";
import { YStack, Separator } from "tamagui";
import { FlashList } from "@shopify/flash-list";
import Notification from "../components/common/notifsScreen/notification";
import useFetchNotifications from "@hooks/useFetchNotifications";
import NotifsHeader from "@components/common/notifsScreen/header";
import useNotifsStore from "@stores/notifsScreen";

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
  const { notifications, addPage, refresh, loading } = useFetchNotifications();

  const headerHeight = useNotifsStore((state) => state.headerHeight);

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

  const keyExtractor = useCallback((item) => item.id || Math.random().toString(), []);

  const getItemType = useCallback((item) => {
    return item.type || 'default';
  }, []);

  return (
    <YStack f={1} backgroundColor="$black">
      <NotifsHeader refresh={refresh} loading={loading} />
      <FlashList
        data={notifications}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={{
          paddingTop: headerHeight,
        }}
        estimatedItemSize={100}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.5}
        getItemType={getItemType}
        showsVerticalScrollIndicator={false}
        updateCellsBatchingPeriod={50}
        maxToRenderPerBatch={10}
        windowSize={11}
        initialNumToRender={10}
      />
    </YStack>
  );
}

export default NotifsScreen;