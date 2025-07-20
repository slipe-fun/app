import { useEffect } from 'react';
import { Camera } from 'react-native-vision-camera';

const useCameraPermission = () => {
  const permission = Camera.getCameraPermissionStatus();

  const micPermission = Camera.getMicrophonePermissionStatus();
  useEffect(() => {
    if (permission !== 'granted') Camera.requestCameraPermission();
  }, []);

  useEffect(() => {
    if (micPermission !== 'granted') Camera.requestMicrophonePermission();
  }, [permission]);
  
  return permission;
}

export default useCameraPermission;

