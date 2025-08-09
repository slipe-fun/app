import { YStack } from "tamagui";
import AuthScreenTitle from "@components/common/authScreen/main/screenTitle";

const AuthPasswordScreen = () => {
  return (
    <YStack flex={1} justifyContent="center" backgroundColor="$bg">
      <AuthScreenTitle
        title="password_title"
        source={require("@assets/auth/monkey.webp")}
      />
    </YStack>
  );
};

export default AuthPasswordScreen;
