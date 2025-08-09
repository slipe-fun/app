import AuthScreenTitle from "@components/common/authScreen/main/screenTitle";
import { YStack } from "tamagui";

const AuthUsernameScreen = () => {
  return (
    <YStack flex={1} justifyContent="center" backgroundColor="$bg">
      <AuthScreenTitle
        title="username_title"
        source={require("@assets/auth/badge.webp")}
      />
    </YStack>
  );
};

export default AuthUsernameScreen;
