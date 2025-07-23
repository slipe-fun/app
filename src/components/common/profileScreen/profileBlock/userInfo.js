import { useProfileStore } from "@stores/profileScreen";
import Icon from "@components/ui/icon";
import { Text, View, useTheme } from "tamagui";
import GetNormalDate from "@lib/getNormalDate";

const ProfileUserInfo = ({ header }) => {
  const user = useProfileStore((state) => state.user);

  const theme = useTheme();
  const iconColor = theme.secondaryText.get();

  return (
    <View w="$full" gap="$4" alignItems="center">
      <Text fz="$7" lh="$7" fw="$3">
        {user?.nickname || user?.username}
      </Text>
      <View flexDirection="row" alignItems="center" gap="$5">
        <View flexDirection="row" alignItems="center" gap="$2">
          <Icon icon="profile" size={18} color={iconColor} />
          <Text fz="$2" lh="$2" fw="$2" color="$secondaryText">
            {user?.followers}
          </Text>
        </View>
        <View br="$7" w="$0.5" h="$0.5" backgroundColor="$secondaryText" />
        <View flexDirection="row" alignItems="center" gap="$2">
          <Icon icon="clock" size={18} color={iconColor} />
          <Text fz="$2" lh="$2" fw="$2" color="$secondaryText">
            {GetNormalDate(user?.date)}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ProfileUserInfo;

