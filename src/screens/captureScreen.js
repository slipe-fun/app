import { View } from "tamagui";
import useInsets from "@hooks/ui/useInsets";
import CaptureCamera from "@components/common/captureScreen/captureCamera";
import CaptureFooter from "@components/common/captureScreen/footer";

const CaptureScreen = () => {
  const insets = useInsets();

  return (
    <View f={1} backgroundColor='$bg' pt={insets.top}>
      <CaptureCamera/>
      <CaptureFooter/>
    </View>
  );
};

export default CaptureScreen;
