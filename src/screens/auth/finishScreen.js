import { Image, YStack } from "tamagui";
import { Text } from "tamagui";
import useAuthStore from "@stores/authScreen";
import AuthFooter from "@components/common/authScreen/footer";

const AuthFinishScreen = ({ navigation }) => {
  const { avatar, nickname, username } = useAuthStore();
  return (
    <YStack
      gap="$7"
      flex={1}
      justifyContent="center"
      alignItems="center"
      ph="$7"
      backgroundColor="$bg"
    >
      <Image source={{ uri: avatar }} w="$28" h="$28" br="$full" />
      <Text fz="$9" lh="$9">
        <Text fw="$3" color="$secondaryText">
          Привет
        </Text>{" "}
        <Text fw="$3" color="$color">
          {nickname || username}
        </Text>
      </Text>
      <AuthFooter navigation={navigation} active nextRoute={5} />
    </YStack>
  );
};

export default AuthFinishScreen;
