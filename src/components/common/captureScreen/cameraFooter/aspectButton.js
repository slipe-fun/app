import ColorfullyView from "@components/ui/colorfullyView";
import useCaptureStore from "@stores/captureScreen";
import { View } from "tamagui";
import { memo } from "react";
import Icon from "@components/ui/icon";
import * as Haptics from "expo-haptics";
import { getVariableValue } from "tamagui";

const colorVar = getVariableValue("$white", "color");

const AspectButton = () => {
  const color = useCaptureStore((s) => s.color);
  const aspect = useCaptureStore((s) => s.aspect);
  const setAspect = useCaptureStore((s) => s.setAspect);

  const handlePress = () => {
     Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
    setAspect(!aspect);
  }

  return (
    <View flex={1} justifyContent="center" alignItems="center">
      <ColorfullyView
        unstyled
        w="$13"
        onPress={() => handlePress()}
        h="$13"
        br="$full"
        isButton
        justifyContent="center"
        alignItems="center"
        position="relative"
        color={color}
      >
        <Icon icon="aspect" size={26} color={colorVar} />
      </ColorfullyView>
    </View>
  );
};

export default memo(AspectButton);
