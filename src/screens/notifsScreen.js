import React from "react";
import { YStack, View, Text } from "tamagui";
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Platform } from "react-native";
import { NotifsDefaultHeader } from "../components/common/notifsScreen/header/default";
import { NotifsAnimatedHeader } from "../components/common/notifsScreen/header/animated";

const ReanimatedScrollView = Animated.ScrollView;

export function NotifsScreen() {
  const scrollY = useSharedValue(0);
  const insets = useSafeAreaInsets();

  const onScroll = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  return (
    <YStack f={1} backgroundColor="$black">
      <NotifsAnimatedHeader scrollY={scrollY} />

      <ReanimatedScrollView
        onScroll={onScroll}
        scrollEventThrottle={16}
        contentContainerStyle={{ paddingTop: Platform.OS === "ios" ? insets.top : insets.top }}
      >
        <NotifsDefaultHeader scrollY={scrollY} />
        {Array.from({ length: 20 }).map((_, index) => (
          <View key={index} h={50}>
            <Text>Уведомление {index + 1}</Text>
          </View>
        ))}
      </ReanimatedScrollView>
    </YStack>
  );
}

export default NotifsScreen;
