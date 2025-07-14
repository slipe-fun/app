import useGetAlbumPhotos from "@hooks/ui/useGetAlbumPhotos";
import { Button, Image, View } from "tamagui";
import * as Haptics from "expo-haptics";
import * as ImagePicker from "expo-image-picker";
import useCaptureStore from "@stores/captureScreen";

const CapturePickGalleryImage = () => {
  const photos = useGetAlbumPhotos(1);
  const setContent = useCaptureStore((s) => s.setContent);
 
  const handlePress = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);

    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) return

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: false,
	  mediaTypes: ['images'],
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setContent(uri);
    }
  };

  return (
    <Button
      onPress={handlePress}
      pressStyle={{
        scale: 0.95,
        opacity: 0.9,
      }}
      backgroundColor="$transparent"
      unstyled
      br="$full"
      overflow="hidden"
      w="$13"
      h="$13"
    >
      <View
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        br="$full"
        zIndex="$2"
        borderWidth={1}
        borderColor="rgba(255, 255, 255, 0.2)"
      />
      <Image
        objectFit="scale-down"
        style={{ width: "100%", height: "100%" }}
        source={{ uri: photos[0]?.uri }}
      />
    </Button>
  );
};

export default CapturePickGalleryImage;
