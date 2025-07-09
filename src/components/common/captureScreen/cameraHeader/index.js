import { XStack } from "tamagui";
import ColorfullyView from "@components/ui/colorfullyView";
import useCaptureStore from "@stores/captureScreen";
import Icon from "@components/ui/icon";
import * as Haptics from "expo-haptics";
import { useNavigation } from "@react-navigation/native";

const CaptureCameraHeader = () => {
  const color = useCaptureStore((s) => s.color);
  const navigation = useNavigation();
  const content = useCaptureStore((s) => s.content);
  const setContent = useCaptureStore((s) => s.setContent);

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
    if (content) {
      setContent('');
    } else {
      navigation.goBack();
    }
  };

  return (
    <XStack
      position="absolute"
      top={0}
      left={0}
      right={0}
      justifyContent=""
      alignItems="center"
      zIndex="$2"
      w="$full"
      p="$6.5"
    >
      <ColorfullyView
        unstyled
        w="$12"
        h="$12"
        br="$full"
        isButton
        onPress={handlePress}
        justifyContent="center"
        alignItems="center"
        color={color}
      >
        <Icon icon="chevronLeft" size={24} />
      </ColorfullyView>
    </XStack>
  );
};

export default CaptureCameraHeader;
