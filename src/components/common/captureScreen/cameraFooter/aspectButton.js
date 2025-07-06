import ColorfullyView from "@components/ui/colorfullyView";
import useCaptureStore from "@stores/captureScreen";
import { View } from "tamagui";
import { memo } from "react";
import Icon from "@components/ui/icon";
import { getVariableValue } from "tamagui";

const colorVar = getVariableValue("$white", "color");

const AspectButton = () => {
  const color = useCaptureStore((s) => s.color);
  return (
    <View flex={1} justifyContent="center" alignItems="center">
      <ColorfullyView
        unstyled
        w="$13"
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
