import { useState, useEffect } from "react";
import { YStack, Separator, Text } from "tamagui";
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Platform } from "react-native";
import { NotifsDefaultHeader } from "../components/common/notifsScreen/header/default";
import { NotifsAnimatedHeader } from "../components/common/notifsScreen/header/animated";
import Notification from "../components/common/notifsScreen/notification";
import { useFetchNotifications } from "../hooks/useFetchNotifications";

const ReanimatedScrollView = Animated.ScrollView;

export function NotifsScreen() {
  const scrollY = useSharedValue(0);
  const insets = useSafeAreaInsets();
  const { notifications, handleFetchNotifications, page, addPage } = useFetchNotifications();

  useEffect(() => {
    handleFetchNotifications();
  }, [page]);

  const onScroll = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  return (
    <YStack f={1} backgroundColor="$black">
      <NotifsAnimatedHeader
        scrollY={scrollY}
      />

      <ReanimatedScrollView
        onScroll={onScroll}
        scrollEventThrottle={16}
        contentContainerStyle={{
          paddingTop: Platform.OS === "ios" ? insets.top : insets.top,
          gap: 16,
        }}
      >
        <NotifsDefaultHeader
          scrollY={scrollY}
        />
        {notifications.map((notification, index) => (
          <YStack key={index} gap="$5" mt="$5" ph="$6">
            <Notification notification={notification} />
            {index < notifications.length - 1 && (
              <Separator
                borderRadius="$full"
                borderBottomWidth={2}
                borderColor="$separator"
                marginLeft={60}
              />
            )}
          </YStack>
        ))}
      </ReanimatedScrollView>
    </YStack>
  );
}

export default NotifsScreen;