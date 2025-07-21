import { View, Text, YStack, XStack } from "tamagui";
import Notification from "./notification";
import MediaPreview from "@components/ui/mediaPreview";
import FastImage from "react-native-fast-image";
import Icon from "@components/ui/icon";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { memo } from "react";
import { quickSpring } from "@constants/easings";
import formatDate from "@lib/formatDate";

const AnimatedYStack = Animated.createAnimatedComponent(YStack);

const NotificationStack = ({ notifications }) => {
  const date = Object.keys(notifications)[0];
  const notificationsList = notifications[date];

  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.985, quickSpring);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, quickSpring);
  };

  return (
    <AnimatedYStack
      style={animatedStyle}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      gap="$6"
      w="$full"
      ph="$6"
    >
      <XStack gap="$6">
        <View
          br="$full"
          h="$13"
          justifyContent="center"
          backgroundColor="$backgroundTransparent"
          p="$7"
          pv="$0"
        >
          <Text fw="$3" fz="$4" lh="$4" color="$white">
            {formatDate(date)}{" "}
            <Text fw="$3" fz="$4" lh="$4" color="$secondaryText">
              30
            </Text>
          </Text>
        </View>
        <View
          h="$13"
          w="$13"
          br="$full"
          backgroundColor="$backgroundTransparent"
          alignItems="center"
          justifyContent="center"
        >
          <Icon
            style={{ transform: [{ rotate: "180deg" }] }}
            icon="chevronLeft"
            size={26}
          />
        </View>
      </XStack>
      <YStack f={1}>
        <YStack w="$full" gap="$6">
          {notificationsList?.map((notification, index) => (
            <Notification notification={notification} />
          ))}
        </YStack>
        {Array.from(6 - notificationsList.length).map((notification, index) => (
          <View
            key={index}
            mh={`${index === 0 ? "$7" : "$10.5"}`}
            opacity={index === 0 ? 0.3 : 0.1}
            f={1}
            w="$full"
            h={`${index === 0 ? "$4" : "$2"}`}
            overflow="hidden"
            borderBottomLeftRadius={index === 0 ? "$5" : "$4"}
            borderBottomRightRadius={index === 0 ? "$5" : "$4"}
          >
            <MediaPreview
              priority={FastImage.priority.low}
              avatar
              media={notification?.from_user?.avatar}
              blurhash={notification?.from_user?.avatar_information?.blurhash}
            />
          </View>
        ))}
      </YStack>
    </AnimatedYStack>
  );
};

export default memo(NotificationStack);
