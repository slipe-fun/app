import { Image, View } from "tamagui";

const CameraOverlay = ({ isBlurring, snapshotUri }) => {
  return (
    <>
      {isBlurring && snapshotUri && (
        <Image
          source={{ uri: snapshotUri }}
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          f={1}
          zIndex="$1"
          blurRadius={20}
          fadeDuration={125}
        />
      )}
      <View
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        br="$7"
        borderWidth={1}
        borderColor="rgba(255,255,255,0.2)"
        zIndex="$2"
      />
    </>
  );
};

export default CameraOverlay;
