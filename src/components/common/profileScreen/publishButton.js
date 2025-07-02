import { Pressable } from "react-native";
import * as MediaLibrary from "expo-media-library";
import { useState, useEffect, useCallback } from "react";
import { View, Image, Button } from "tamagui";
import * as Haptics from "expo-haptics";
import { useNavigation } from "@react-navigation/native";
import { GradientBorder } from "@components/ui/gradientBorder";
import { getAverageColor } from "@somesoap/react-native-image-palette";
import Icon from "@components/ui/icon";

const PublishButton = () => {
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();
  const [photos, setPhotos] = useState([]);
  const navigation = useNavigation();
  const [color, setColor] = useState(null);

  useEffect(() => {
    if (
      permissionResponse?.status === MediaLibrary.PermissionStatus.UNDETERMINED
    ) {
      requestPermission();
    }
  }, [permissionResponse?.status, requestPermission]);

  useEffect(() => {
    const loadPhotos = async () => {
      if (permissionResponse?.granted) {
        const media = await MediaLibrary.getAssetsAsync({
          mediaType: [MediaLibrary.MediaType.photo],
          first: 4,
          sortBy: [[MediaLibrary.SortBy.creationTime, false]],
        });
        setPhotos(media.assets ?? []);
        getAverageColor(media.assets[0]?.uri, { pixelSpacingAndroid: 7 }).then(
          setColor
        );
      } else {
        setPhotos([]);
      }
    };
    loadPhotos();
  }, [permissionResponse?.granted]);

  const rows = [];
  for (let i = 0; i < photos.length; i += 2) {
    rows.push(photos.slice(i, i + 2));
  }

  const handlePress = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
    navigation.navigate("Publish", { screen: "Publish_capture" })
  }, []);

  return (
      <Button
        unstyled
        m="$3"
        w="$full"
        h="$27"
        br="$7"
        animation="fast"
        backgroundColor="$transparent"
        justifyContent="center"
        alignItems="center"
        position="relative"
        overflow="hidden"
        pressStyle={{
          scale: 0.98,
          opacity: 0.9,
        }}
        onPress={handlePress}
      >
        {rows.map((row, rowIndex) => (
          <View key={rowIndex} flexDirection="row" f={1}>
            {row.map((photo) => (
              <Image
                key={photo.id}
                source={{ uri: photo.uri }}
                f={1}
                objectFit="scale-down"
              />
            ))}
          </View>
        ))}
        <GradientBorder
          w="$19"
          h="$19"
          br="$full"
          borderRadius="$full"
          position="absolute"
          zIndex={1}
          overflow="hidden"
        >
          <View
            f={1}
            backgroundColor={color}
            justifyContent="center"
            alignItems="center"
          >
            <Icon icon="publish" size={44} color="white" />
          </View>
        </GradientBorder>
      </Button>
  );
};

export default PublishButton;
