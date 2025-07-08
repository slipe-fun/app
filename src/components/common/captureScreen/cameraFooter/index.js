import { View, XStack, YStack } from "tamagui";
import CaptureButton from "./captureButton";
import AspectButton from "./aspectButton";
import CaptureRecordingTimer from "./recordingTimer";
import { useRef, useState, useEffect } from "react";

const CaptureCameraFooter = ({ cameraRef }) => {
  const ref = useRef(null);
  const [viewHeight, setViewHeight] = useState(0);

  useEffect(() => {
    setViewHeight(ref.current?.getBoundingClientRect()?.height);
  }, []);

  return (
    <YStack
      position="absolute"
      bottom={0}
      left={0}
      right={0}
      justifyContent=""
      alignItems="center"
      zIndex="$2"
      overflow="visible"
      w="$full"
      ph="$6.5"
    >
      <CaptureRecordingTimer viewHeight={viewHeight} />
      <XStack ref={ref} pv="$8" pt="$6" w="$full" flexDirection="row">
        <View flex={1} justifyContent="center" alignItems="center" />
        <CaptureButton cameraRef={cameraRef} />
        <AspectButton />
      </XStack>
    </YStack>
  );
};

export default CaptureCameraFooter;
