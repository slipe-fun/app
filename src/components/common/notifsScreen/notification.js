import { Avatar, Text, View, Button, YStack, styled } from "tamagui";
import Icon from "../../ui/icon";

const NotificationContent = ({ type, emoji, comment }) => {
  const renderContent = () => {
    switch (type) {
      case "follow":
        return <Text>подписался на вас</Text>;
      case "reaction":
        return <Text> оставил реакцию {emoji}</Text>;
      case "comment":
        return <Text> оставил комментарий: {comment}</Text>;
    }
  };

  return renderContent();
};

const Notification = ({ notification }) => {
  const ThemedIcon = styled(Icon, {
    color: "$color",
    size: 20,
  });

  return (
    <View>
      <Avatar src={notification.user.avatar} />
      <View>
        <Text>
          {notification.user.nickname}{" "}
          <Text color="$color9">{notification.time}</Text>
        </Text>
        <NotificationContent
          type={notification.type}
          emoji={notification.emoji}
          comment={notification.comment}
        />
      </View>
      <Button backgroundColor="$elemBackground" p={0}>
        <ThemedIcon icon="arrowUpRight" />
      </Button>
    </View>
  );
};

export default Notification;
