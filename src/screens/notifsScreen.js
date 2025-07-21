import { YStack, getVariableValue } from "tamagui";
import useFetchNotifications from "@hooks/useFetchNotifications";
import NotifsHeader from "@components/common/notifsScreen/header";
import useNotifsStore from "@stores/notifsScreen";
import NotifsFooter from "@components/common/notifsScreen/footer";
import NotificationStack from "@components/common/notifsScreen/notificationsStack";
import { FlashList } from "@shopify/flash-list";

const gap = getVariableValue("$10", "space");

const NotifsScreen = () => {
  const { notifications, addPage, refresh, loading } = useFetchNotifications();
  const headerHeight = useNotifsStore((state) => state.headerHeight);
  const footerHeight = useNotifsStore((state) => state.footerHeight);

  return (
    <YStack f={1} backgroundColor="$black">
      <NotifsHeader refresh={refresh} loading={loading} />
      
      <FlashList
        data={notifications}
        renderItem={({ item }) => <NotificationStack notifications={item} />}
        keyExtractor={(item, index) => String(item.id ?? index)}
        estimatedItemSize={120}
        contentContainerStyle={{ paddingTop: headerHeight + 16, paddingBottom: footerHeight + 12 }}
        ItemSeparatorComponent={() => <YStack height={gap} />}
        onEndReached={addPage}
        onEndReachedThreshold={0.5}
      />
      <NotifsFooter count={notifications.length} />
    </YStack>
  );
}

export default NotifsScreen;
