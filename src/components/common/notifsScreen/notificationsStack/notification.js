import MediaPreview from "@components/ui/mediaPreview";
import { StyleSheet } from "react-native";
import { XStack, YStack, View, Text, Image } from "tamagui";
import FastImage from "react-native-fast-image";
import Icon from "@components/ui/icon";
import { memo } from "react";

const badgeColors = {
  reaction: "$primary",
  comment: "$purple",
  subscribe: "$yellow",
}

const NotificationBadge = ({ action }) => {
  switch (action) {
    case "reaction":
      return (
        <Icon icon="smile" size={16} />
      );
    case "comment":
      return (
        <Icon icon="message" size={16} />
      );
    case "subscribe":
      return (
        <Icon icon="profile" size={16} />
      );
    default:
      return null;
  }
}

const NotificationActionText = ({ action, reaction }) => {
  switch (action) {
    case "reaction":
      return (
        <XStack gap="$1">
          <Text color="$transparentText" fw="$2" fz="$1" lh="$1">Оставил реакцию: {reaction} </Text>
          <Image width="$1" height="$1" source='' />
        </XStack>
      );
    case "comment":
      return (
        <Text color="$transparentText" fw="$2" fz="$1" lh="$1">Оставил комментарий</Text>
      );
    case "subscribe":
      return (
        <Text color="$transparentText" fw="$2" fz="$1" lh="$1">Подписался на вас</Text>
      );
    default:
      return null;
  }
};

const Notification = ({ notification }) => {
  return (
    <View w="$full" br="$7" overflow="hidden" backgroundColor="$backgroundTransparent">
      <View opacity={0.15} style={StyleSheet.absoluteFill}>
        <MediaPreview
          type="avatar"
          media={notification?.from_user?.avatar}
          blurhash={notification?.from_user?.avatar_information?.blurhash}
          priority={FastImage.priority.normal}
        />
      </View>
      <YStack gap="$5.5" p="$5.5" w="$full">
        <XStack w="$full" alignItems="flex-start" gap="$5.5">
          <View w="$13" h="$13" br="$full" overflow="hidden">
            {notification?.from_user?.avatar ? (
              <MediaPreview
                type="avatar"
                media={notification?.from_user?.avatar}
                blurhash={notification?.from_user?.avatar_information?.blurhash}
                priority={FastImage.priority.normal}
              />
            ) : (
              <View
                backgroundColor="$black"
                justifyContent="center"
                alignItems="center"
                w="$13"
                h="$13"
                br="$full"
              >
                <Icon icon="profile" size={24} />
              </View>
            )}
          </View>
          <YStack f={1} justifyContent="center" gap="$1.5">
            <Text color="$white" fw="$3" fz="$3" lh="$3">{notification?.from_user?.nickname || notification?.from_user?.username}</Text>
            <NotificationActionText action={notification?.type} reaction={notification?.type === "reaction" && notification?.object?.name}/>
          </YStack>
          <View justifyContent="center" alignItems="center" w="$6" h="$6" br="$full" backgroundColor={badgeColors[notification?.type]} overflow="hidden">
            <NotificationBadge action={notification?.type} />
          </View>
        </XStack>
        {notification?.type === "comment" && (
          <Text fz="$2" lh="$2" fw="$2" pl="$12">
            {notification?.object?.text}
          </Text>
        )}
      </YStack>
    </View>
  );
};

export default memo(Notification);
