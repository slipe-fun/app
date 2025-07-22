import { useRef, useState, useEffect } from "react";
import { YStack } from "tamagui";

import useCameraPermission from "@hooks/ui/useCameraPermission";

import CaptureCamera from "./camera";
import CaptureCameraHeader from "../cameraHeader";
import CaptureCameraFooter from "../cameraFooter";
import CaptureCameraResult from "./result";
import CaptureCameraDenied from "./cameraDenied";

const CaptureScreen = () => {
  const ref = useRef(null);
  const [viewHeight, setViewHeight] = useState(0);

  const permission = useCameraPermission();

  useEffect(() => {
    if (ref.current?.getBoundingClientRect) {
      setViewHeight(ref.current.getBoundingClientRect().height);
    }
  }, []);

  return (
    <YStack
      ref={ref}
      f={1}
      br="$12"
      position="relative"
      justifyContent="center"
      overflow="hidden"
    >
      {permission === "granted" && (
        <CaptureCamera permission={permission} viewHeight={viewHeight} />
      )}
      <CaptureCameraHeader />
      {permission === "granted" ? (
        <>
          <CaptureCameraResult />
          <CaptureCameraFooter />
        </>
      ) : (
        <CaptureCameraDenied /> 
      )}
    </YStack>
  );
};

export default CaptureScreen;
