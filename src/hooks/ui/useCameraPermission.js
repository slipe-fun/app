import { useEffect } from "react";
import { Camera } from "react-native-vision-camera";

const useCameraPermission = () => {
  const camPermission = Camera.getCameraPermissionStatus();

  const micPermission = Camera.getMicrophonePermissionStatus();
  useEffect(() => {
    if (camPermission !== "granted") Camera.requestCameraPermission();
    if (micPermission !== "granted") Camera.requestMicrophonePermission();
  }, []);
  return { camPermission, micPermission };
};

export default useCameraPermission;
