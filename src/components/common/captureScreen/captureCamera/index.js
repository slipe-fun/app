import { useRef, useState, useEffect } from "react";
import { Button, Text, YStack, View } from "tamagui";

import useCameraPermission from "@hooks/ui/useCameraPermission";

import CaptureCamera from "./camera";
import CaptureCameraHeader from "../cameraHeader";
import CaptureCameraFooter from "../cameraFooter";
import CaptureCameraResult from "./result";
import ShaderShi from "@components/ui/shaderShi";
import { Linking } from "react-native";

const CaptureScreen = () => {
  const ref = useRef(null);
  const [viewHeight, setViewHeight] = useState(0);

  const permission = useCameraPermission();

  useEffect(() => {
    if (ref.current?.getBoundingClientRect) {
      setViewHeight(ref.current.getBoundingClientRect().height);
    }
  }, []);

  const handleSettingsOpen = async () => {
    try {
      await Linking.openSettings();
    } catch {}
  };

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
        <>
          <ShaderShi
            style={{
              width: "100%",
              height: "100%",
              position: "absolute",
              opacity: 0.5,
            }}
            colors={["#8257DB", "#FF9F0A", "#FF1A1A", "#FF668B"]}
          />
          <View
            position="absolute"
            left={0}
            right={0}
            p="$6"
            bottom={0}
            zIndex="$1"
            pointerEvents="auto"
          >
            <Button
              br="$full"
              backgroundColor="$lessGlassButton"
              alignItems="center"
              justifyContent="center"
              unstyled
              onPress={handleSettingsOpen}
              w="$full"
              h="$13"
              pointerEvents="box-none"
            >
              <Text fw="$3" fz="$3" lh="$3">
                Настройки
              </Text>
            </Button>
          </View>
        </>
      )}
    </YStack>
  );
};

export default CaptureScreen;
