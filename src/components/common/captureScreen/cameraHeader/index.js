import { XStack } from "tamagui";
import ColorfullyView from "@components/ui/colorfullyView";
import useCaptureStore from "@stores/captureScreen";
import Icon from "@components/ui/icon";
import * as Haptics from "expo-haptics";
import { useNavigation } from "@react-navigation/native";
import AnimatedMenuButton from "@components/ui/dropdownMenu";

const CaptureCameraHeader = () => {
  const color = useCaptureStore((s) => s.color);
  const content = useCaptureStore((s) => s.content);
  const setContent = useCaptureStore((s) => s.setContent);
  const setCategory = useCaptureStore((s) => s.setCategory);
  const navigation = useNavigation();

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
    if (content) {
      setContent("");
    } else {
      navigation.goBack();
    }
  };

  // TODO: Uncomment this code after writing the warning modal
  //   useEffect(() => {
  //     const unsubscribe = navigation.addListener('beforeRemove', () => {
  //       if (content) {
  //         setContent('');
  //       }
  //     });

  //     return unsubscribe;
  //   }, [navigation, content, setContent]);

  return (
    <XStack
      position="absolute"
      top={0}
      left={0}
      right={0}
      justifyContent="space-between"
      alignItems="flex-start"
      zIndex="$2"
      w="$full"
      p="$6"
    >
      <ColorfullyView
        unstyled
        w="$13"
        h="$13"
        br="$full"
        isButton
        onPress={handlePress}
        justifyContent="center" 
        alignItems="center"
        color={color}
      >
        <Icon icon="chevronLeft" size={26} />
      </ColorfullyView>
      {content ? <AnimatedMenuButton setActiveItem={setCategory} color={color} /> : null}
    </XStack>
  );
};

export default CaptureCameraHeader;
