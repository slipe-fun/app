import { Image } from "tamagui";
import useCaptureStore from "@stores/captureScreen";
import Video from "react-native-video";
import { StyleSheet } from "react-native";

const CaptureCameraResult = () => {
  const content = useCaptureStore((s) => s.content);

  const isVideo = content ? /\.(mp4|mov|webm|mkv|avi)$/i.test(content) : false;

  return content ? (
    isVideo ? (
      <Video
        source={{ uri: content }}
        repeat
        resizeMode="contain"
        style={[StyleSheet.absoluteFill, {zIndex: 10 }]}
      />
    ) : (
      <Image
        zIndex="$1"
        fadeDuration={125}
        w="$full"
        h="$full"
        position="absolute"
        top={0}
        right={0}
        left={0}
        bottom={0}
        resizeMethod="contain"
        source={{ uri: content }}
      />
    )
  ) : null;
};

export default CaptureCameraResult;
