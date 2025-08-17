import { YStack } from "tamagui";
import AuthScreenTitle from "@components/common/authScreen/main/screenTitle";
import AuthSourceSelect from "@components/common/authScreen/avatar/sourceSelect";
import AuthFooter from "@components/common/authScreen/footer";
import useAuthStore from "@stores/authScreen";
import { useState } from "react";
import { api } from "@lib/api";
import { createSecureStorage } from "@lib/storage";
import mime from 'react-native-mime-types';
import { toast } from "sonner-native";

const AuthAvatarScreen = ({ navigation }) => {
  const { avatar, username, password } = useAuthStore();
  const [active, setActive] = useState(true);

  async function saveSettings(token) {
    try {
      const fileName = avatar.split('/').pop() || 'upload.bin';
      const fileExtension = fileName.split('.').pop() || '';

      const mimeType = mime.lookup(fileExtension) || 'application/octet-stream';

      const form = new FormData();
      if (avatar) form.append("avatar", {
        uri: avatar,
        type: mimeType,
        name: fileName,
      });

      await api.v2.post('/user/settings/profile', form, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        }
      })
    } catch (error) {
    }
  }

  async function callback() {
    try {
      setActive(false);
      const res = await api.v2.post(
        "/auth/register",
        JSON.stringify({
          username,
          password,
        })
      );

      const token = res?.data?.token;

      if (!token) {
        toast.error("Unknown error");
        return false;
      }

      const storage = await createSecureStorage("user-storage")
      storage.set("token", token);
      await saveSettings(token);
      setActive(true);

      return true;
    } catch (error) {
      toast.error(error?.response?.data?.error);
      setActive(true);
      return false;
    }
  }

  return (
    <YStack gap="$7" flex={1} justifyContent="center" ph="$7" backgroundColor="$bg">
      <AuthScreenTitle
        title="avatar_title"
        source={require("@assets/auth/artist.webp")}
      />
      <AuthSourceSelect />
      <AuthFooter navigation={navigation} active={active} nextRoute={4} callback={callback} />
    </YStack>
  );
};

export default AuthAvatarScreen;
