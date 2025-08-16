import { YStack } from "tamagui";
import AuthScreenTitle from "@components/common/authScreen/main/screenTitle";
import AuthSourceSelect from "@components/common/authScreen/avatar/sourceSelect";
import AuthFooter from "@components/common/authScreen/footer";
import useAuthStore from "@stores/authScreen";

const AuthAvatarScreen = ({ navigation }) => {
  const { avatar } = useAuthStore();

  return (
    <YStack gap="$7" flex={1} justifyContent="center" ph="$7" backgroundColor="$bg">
      <AuthScreenTitle
        title="avatar_title"
        source={require("@assets/auth/artist.webp")}
      />
      <AuthSourceSelect />
      <AuthFooter navigation={navigation} active={avatar !== ""} nextRoute={4}/>
    </YStack>
  );
};

export default AuthAvatarScreen;
