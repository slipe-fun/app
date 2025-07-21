import { useCallback } from "react";
import { YStack, Separator } from "tamagui";
import useFetchNotifications from "@hooks/useFetchNotifications";
import NotifsHeader from "@components/common/notifsScreen/header";
import useNotifsStore from "@stores/notifsScreen";
import NotifsFooter from "@components/common/notifsScreen/footer";
import NotificationStack from "@components/common/notifsScreen/notificationsStack";
import { ScrollView } from "react-native-gesture-handler";

export function NotifsScreen() {
  const { notifications, addPage, refresh, loading } = useFetchNotifications();

  const headerHeight = useNotifsStore((state) => state.headerHeight);

  return (
    <YStack f={1} backgroundColor="$black">
      <NotifsHeader refresh={refresh} loading={loading} />
      <ScrollView style={{ width: '100%', height: '100%' }}  contentContainerStyle={{ paddingTop: headerHeight }}>
        <NotificationStack />
      </ScrollView>
      <NotifsFooter count={400} />
    </YStack>
  );
}

export default NotifsScreen;