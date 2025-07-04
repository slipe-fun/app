import { useEffect } from 'react';
import { Camera } from 'react-native-vision-camera';

const useCameraPermission = () => {
  const permission = Camera.getCameraPermissionStatus();
  useEffect(() => {
    (async () => {
      if (permission !== 'granted') await Camera.requestCameraPermission();
    })();
  }, []);
  return permission;
}

export default useCameraPermission;

