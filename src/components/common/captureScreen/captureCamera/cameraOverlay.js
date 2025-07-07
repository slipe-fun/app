import { Image } from "tamagui";

const CameraOverlay = ({ isBlurring, snapshotUri }) => {
  return (
    <>
      {isBlurring && snapshotUri && (
        <Image
          source={{ uri: snapshotUri }}
          position="absolute"
          top={0}
          left={0}
          flex={1}
          right={0}
          bottom={0}
          f={1}
          zIndex="$1"
          blurRadius={40}
          fadeDuration={125}
        />
      )}
    </>
  );
};

export default CameraOverlay;
