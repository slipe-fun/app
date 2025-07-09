import { YStack } from "tamagui";
import useInsets from "@hooks/ui/useInsets";
import CaptureCamera from "@components/common/captureScreen/captureCamera";
import CaptureFooter from "@components/common/captureScreen/footer/capture";
import CaptureFooterPublish from "@components/common/captureScreen/footer/publish";
import useCaptureStore from "@stores/captureScreen";

const CaptureScreen = () => {
  const insets = useInsets();
  const content = useCaptureStore((s) => s.content);

  return (
    <YStack flexDirection="column" f={1} backgroundColor="$bg" pt={insets.top}>
      <CaptureCamera/>
      {content ? <CaptureFooterPublish/> : <CaptureFooter/>}
    </YStack> 
  );
};

export default CaptureScreen;
