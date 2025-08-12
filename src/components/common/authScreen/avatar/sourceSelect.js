import { XStack, View, Image, Text } from "tamagui";
import useGetAlbumPhotos from "@hooks/ui/useGetAlbumPhotos";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Alert } from "react-native";
import { Camera, useCameraDevice } from "react-native-vision-camera";
import useAppLifecycle from "@hooks/ui/useAppLifecycle";
import useBestCameraFormat from "@hooks/ui/useBestCameraFormat";
import useCameraPermission from "@hooks/ui/useCameraPermission";
import useAuthStore from "@stores/authScreen";
import * as ImagePicker from "expo-image-picker";

const AuthSourceSelect = () => {
  const photos = useGetAlbumPhotos(1);
  const device = useCameraDevice("front");
  const format = useBestCameraFormat();
  const { setAvatar } = useAuthStore();
  const active = useAppLifecycle();
  const permission = useCameraPermission();
 
  const openCamera = async () => {
    if (permission !== "granted") return;

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ['images'],
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setAvatar(uri);
    }
  };

  const openGallery = async () => {
    await ImagePicker.requestMediaLibraryPermissionsAsync();
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setAvatar(uri);
    }
  };

  return (
    <XStack w="$full" gap="$7">
      <View
        justifyContent="flex-end"
        pressStyle={{ opacity: 0.75 }}
        br="$9"
        overflow="hidden"
        f={1}
        onPress={openGallery}
        aspectRatio={1}
        backgroundColor="$backgroundTransparent"
      >
        <Image
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          objectFit="cover"
          source={{ uri: photos[0]?.uri }}
        />
        <View
          position="relative"
          p="$6.5"
          justifyContent="center"
          alignItems="center"
        >
          <LinearGradient
            colors={["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.5)"]}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={StyleSheet.absoluteFill}
          />
          <Text fz="$4" lh="$4" fw="$3" color="$white">
            Галерея
          </Text>
        </View>
      </View>
      <View
        justifyContent="flex-end"
        pressStyle={{ opacity: 0.75 }}
        br="$9"
        overflow="hidden"
        f={1}
        onPress={openCamera}
        aspectRatio={1}
        backgroundColor="$backgroundTransparent"
      >
        <Camera
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={active}
          format={format}
          photoQualityBalance="balance"
          photo
        />
        <View
          position="relative"
          p="$6.5"
          justifyContent="center"
          alignItems="center"
        >
          <LinearGradient
            colors={["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.5)"]}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={StyleSheet.absoluteFill}
          />
          <Text fz="$4" lh="$4" fw="$3" color="$white">
            Камера
          </Text>
        </View>
      </View>
    </XStack>
  );
};

export default AuthSourceSelect;
