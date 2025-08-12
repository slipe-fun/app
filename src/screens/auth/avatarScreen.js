import { YStack } from "tamagui";
import AuthScreenTitle from "@components/common/authScreen/main/screenTitle";
import AuthSourceSelect from "@components/common/authScreen/avatar/sourceSelect";

const AuthAvatarScreen = () => {
  return (
    <YStack gap="$7" flex={1} justifyContent="center" ph="$7" backgroundColor="$bg">
      <AuthScreenTitle
        title="avatar_title"
        source={require("@assets/auth/artist.webp")}
      />
      <AuthSourceSelect />
    </YStack>
  );
};

export default AuthAvatarScreen;
