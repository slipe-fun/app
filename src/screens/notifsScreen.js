import { YStack, getVariableValue } from "tamagui";
import useFetchNotifications from "@hooks/useFetchNotifications";
import NotifsHeader from "@components/common/notifsScreen/header";
import useNotifsStore from "@stores/notifsScreen";
import NotifsFooter from "@components/common/notifsScreen/footer";
import NotificationStack from "@components/common/notifsScreen/notificationsStack";
import { FlashList } from "@shopify/flash-list";

const gap = getVariableValue("$8", "space");

const NotifsScreen = () => {
  const { notifications, addPage, refresh, loading } = useFetchNotifications();
  const headerHeight = useNotifsStore((state) => state.headerHeight);

  return (
    <YStack f={1} backgroundColor="$black">
      <NotifsHeader refresh={refresh} loading={loading} />
      
      <FlashList
        data={notifications}
        renderItem={({ item }) => <NotificationStack />}
        keyExtractor={(item, index) => String(item.id ?? index)}
        estimatedItemSize={120}
        contentContainerStyle={{ paddingTop: headerHeight + 12, paddingBottom: 20 }}
        ItemSeparatorComponent={() => <YStack height={gap} />}
        onEndReached={addPage}
        onEndReachedThreshold={0.5}
        ListFooterComponent={<NotifsFooter count={notifications.length} />}
      />
    </YStack>
  );
}

export default NotifsScreen;
  