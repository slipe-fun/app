import { YStack } from "tamagui";
import AuthScreenTitle from "@components/common/authScreen/main/screenTitle";

const AuthAvatarScreen = () => {
    return (
        <YStack flex={1} justifyContent="center" backgroundColor="$bg">
        <AuthScreenTitle
          title="avatar_title"
          source={require("@assets/auth/artist.webp")}
        />
      </YStack>
    )
}

export default AuthAvatarScreen