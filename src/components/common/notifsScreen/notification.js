import { Avatar, Text, View, Button, useTheme, Image } from "tamagui";
import Icon from "../../ui/icon";
import { GradientBorder } from "../../ui/gradientBorder";

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
      case "follow":
        return (
          <Text lh="$1" fz="$1" color="$secondaryText">
            Подписался на вас
          </Text>
        );
      case "reaction":
        return (
          <Text lh="$1" fz="$1" color="$secondaryText">
            Оставил реакцию
          </Text>
        );
      case "comment":
        return (
          <Text lh="$1" fz="$1" color="$secondaryText">
            Оставил комментарий: {comment}
          </Text>
        );
    }
  };

  return renderContent();
};

const Notification = ({ notification }) => {
  const theme = useTheme();

  return (
    <View justifyContent="space-between" flexDirection="row" gap="$6">
      <Avatar circular size="$13">
        <Avatar.Image src={notification.user.avatar} />
        <Avatar.Fallback backgroundColor="$backgroundTransparent" />
      </Avatar>
      <View flex={1} gap="$2">
        <Text color="$color" fw="$3" fz="$2" lh="$2">
          {notification.user.nickname}
          {"  "}
          <Text fw="$3" fz="$2" lh="$2" color="$secondaryText">
            {notification.time}
          </Text>
        </Text>
        <NotificationContent
          type={notification.type}
          comment={notification.comment}
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
          <Image width="$9" height="$9" source={emojiImages[notification.emoji]} />
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
