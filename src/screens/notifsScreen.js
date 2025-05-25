import { useState, useMemo } from "react";
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

const ReanimatedScrollView = Animated.ScrollView;

const notifications = [
  { user: { nickname: "John Doe", avatar: require("../../assets/test/ava-example.png") }, type: "follow", time: "2ч" },
  { user: { nickname: "John Doe", avatar: require("../../assets/test/ava-example.png") }, type: "reaction", emoji: "0_32", time: "2ч" },
  { user: { nickname: "John Doe", avatar: require("../../assets/test/ava-example.png") }, type: "comment", comment: "...", time: "2ч" },
  { user: { nickname: "John Doe", avatar: require("../../assets/test/ava-example.png") }, type: "follow", time: "1д" },
  { user: { nickname: "John Doe", avatar: require("../../assets/test/ava-example.png") }, type: "reaction", emoji: "0_16", time: "1д" },
  { user: { nickname: "John Doe", avatar: require("../../assets/test/ava-example.png") }, type: "comment", comment: "...", time: "3д" },
  { user: { nickname: "John Doe", avatar: require("../../assets/test/ava-example.png") }, type: "follow", time: "3д" },
  { user: { nickname: "John Doe", avatar: require("../../assets/test/ava-example.png") }, type: "reaction", emoji: "0_29", time: "3д" },
  { user: { nickname: "John Doe", avatar: require("../../assets/test/ava-example.png") }, type: "comment", comment: "...", time: "3д" },
];

const tabs = [
  { key: "all", label: "Все" },
  { key: "subscribes", label: "Подписки" },
  { key: "reactions", label: "Реакции" },
  { key: "comments", label: "Комментарии" },
];

const timeSections = {
  "2ч": "Недавно",
  "1д": "Вчера",
  "3д": "3 дня назад",
};

export function NotifsScreen() {
  const scrollY = useSharedValue(0);
  const insets = useSafeAreaInsets();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const sections = useMemo(() => {
    const grouped = {};
    notifications.forEach((item) => {
      const section = timeSections[item.time] || item.time;
      if (!grouped[section]) grouped[section] = [];
      grouped[section].push(item);
    });
    return grouped;
  }, []);

  const onScroll = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  return (
    <YStack f={1} backgroundColor="$black">
      <NotifsAnimatedHeader
        scrollY={scrollY}
        tabs={tabs}
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
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
          tabs={tabs}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
        />

        {Object.entries(sections).map(([sectionTitle, items]) => (
          <YStack key={sectionTitle}>
            <Text color="$secondaryText" mb="$1" pl="$6" fz="$2" lh="$2">
              {sectionTitle}
            </Text>
            {items.map((notification, index) => (
              <YStack key={index} gap="$5" mt="$5" ph="$6">
                <Notification notification={notification} />
                {index < items.length - 1 && (
                  <Separator
                    borderRadius="$full"
                    borderBottomWidth={2}
                    borderColor="$separator"
                    marginLeft={60}
                  />
                )}
              </YStack>
            ))}
          </YStack>
        ))}
      </ReanimatedScrollView>
    </YStack>
  );
}

export default NotifsScreen;
