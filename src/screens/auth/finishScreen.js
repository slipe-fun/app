import { Image, YStack } from "tamagui";
import { Text } from "tamagui";
import useAuthStore from "@stores/authScreen";
import AuthFooter from "@components/common/authScreen/footer";
import { useTranslation } from "react-i18next";

const AuthFinishScreen = ({ navigation }) => {
  const { avatar, username } = useAuthStore();
  const { t } = useTranslation();

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
          {t("auth.finish_title")}
        </Text>{" "}
        <Text fw="$3" color="$color">
          {username}
        </Text>
      </Text>
      <AuthFooter navigation={navigation} active nextRoute={5} />
    </YStack>
  );
};

export default AuthFinishScreen;
