import { Avatar, Text, View, Button, useTheme, Image } from "tamagui";
import Icon from "@components/ui/icon";
import { GradientBorder } from "@components/ui/gradientBorder";
import { URLS } from "@constants/urls";
import TimePassedFromDate from "../../../lib/time-from-date";

const emojiImages = {
  "0_16": require("../../../../assets/emojis/0_16.png"),
  "0_29": require("../../../../assets/emojis/0_29.png"),
  "0_32": require("../../../../assets/emojis/0_32.png"),
  "0_39": require("../../../../assets/emojis/0_39.png"),
  "1_29": require("../../../../assets/emojis/1_29.png"),
  "1_35": require("../../../../assets/emojis/1_35.png"),
};

const NotificationContent = ({ type, comment }) => {
  const renderContent = () => {
    switch (type) {
      case "subscribe":
        return (
          <Text lh="$1" fz="$1" color="$secondaryText">
            Subscribed to you
          </Text>
        );
      case "reaction":
        return (
          <Text lh="$1" fz="$1" color="$secondaryText">
            Reacted your post
          </Text>
        );
      case "comment":
        return (
          <Text lh="$1" fz="$1" color="$secondaryText">
            {comment}
          </Text>
        );
    }
  };

  return renderContent();
};

const Notification = ({ notification }) => {
  const theme = useTheme();

  const user = notification?.from_user;
  return (
    <View justifyContent="space-between" alignItems={notification.type === "comment" ? "flex-start" : "center"} flexDirection="row" gap="$6">
      <Avatar circular size="$13">
        <Avatar.Image src={URLS.CDN_AVATARS_URL + user?.avatar} />
        <Avatar.Fallback backgroundColor="$backgroundTransparent" />
      </Avatar>
      <View flex={1} gap="$2">
        <Text color="$color" fw="$3" fz="$2" lh="$2">
          {user?.nickname || user?.username}
          {"  "}
          <Text fw="$3" fz="$2" lh="$2" color="$secondaryText">
            {TimePassedFromDate(notification.date)}
          </Text>
        </Text>
        <NotificationContent
          type={notification.type}
          comment={notification?.object?.text}
        />
      </View>
      <GradientBorder style={{ height: 40, marginTop: 2 }} borderRadius={99}>
        {notification.type === "reaction" ? (
          <Button
          minWidth="$12"
          width="$12"
          height="$12"
          backgroundColor="$transparent"
          p={0}
        >
          <Image width="$9" height="$9" source={emojiImages[notification?.object?.name]} />
        </Button>
        ) : (
          <Button
          minWidth="$12"
          width="$12"
          height="$12"
          borderRadius="$full"
          backgroundColor="$backgroundTransparent"
          p={0}
        >
          <Icon size={20} icon="arrowUpRight" color={theme.color.get()} />
        </Button>
        )}
        
      </GradientBorder>
    </View>
  );
};

export default Notification;
