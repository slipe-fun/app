import { View } from "tamagui";
import CaptureButton from "./captureButton";

const CaptureCameraFooter = ({ cameraRef }) => {
  return (
    <View
      zIndex="$2"
      position="absolute"
      bottom={0}
      left={0}
      right={0}
      w="$full"
      pv="$8"
      ph="$6.5"
    >
      <CaptureButton cameraRef={cameraRef} />
    </View>
  );
};

export default CaptureCameraFooter;
