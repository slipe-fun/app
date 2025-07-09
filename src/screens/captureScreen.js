import { YStack } from "tamagui";
import useInsets from "@hooks/ui/useInsets";
import CaptureCamera from "@components/common/captureScreen/captureCamera";
import CaptureFooter from "@components/common/captureScreen/footer/capture";

const CaptureScreen = () => {
  const insets = useInsets();

  return (
    <YStack flexDirection="column" f={1} backgroundColor="$bg" pt={insets.top}>
      <CaptureCamera/>
      <CaptureFooter/>
    </YStack>
  );
};

export default CaptureScreen;
