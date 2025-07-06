import { View } from "tamagui";
import CaptureButton from "./captureButton";
import AspectButton from "./aspectButton";

const CaptureCameraFooter = ({ cameraRef }) => {
  return (
    <View
      zIndex="$2"
	  flexDirection="row"
      position="absolute"
      bottom={0}
      left={0}
      right={0}
      w="$full"
      pv="$8"
      ph="$6.5"
    >
      <View flex={1} justifyContent="center" alignItems="center"/>
      <CaptureButton cameraRef={cameraRef} />
      <AspectButton />
    </View>
  );
};

export default CaptureCameraFooter;
