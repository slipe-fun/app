import { useState } from "react";
import Icon from "@components/ui/icon";
import { Button } from "tamagui";
import Animated from "react-native-reanimated";
import * as Haptics from "expo-haptics";
import CircularIndicator from "@components/ui/circularIndicator";
import { View } from "tamagui";
import { getFadeIn, getFadeOut } from "@constants/fadeAnimations";
import useCaptureStore from "@stores/captureScreen";
import publishBlog from "@lib/publishBlog";
import { useNavigation } from "@react-navigation/native";
const AnimatedView = Animated.createAnimatedComponent(View);

const CaptureFooterPublishButton = () => {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const postName = useCaptureStore((s) => s.postName);
  const category = useCaptureStore((s) => s.category);
  const content = useCaptureStore((s) => s.content);

  const navigation = useNavigation();

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
    setLoading(true);

    publishBlog(postName, category?.name, content, (progress) => {
      setProgress(progress);
    }).then(() => {
      setLoading(false);
      setProgress(0);
      navigation.navigate("MainApp");
    }).catch(() => {
      setLoading(false);
      setProgress(0);
    });
  };

  return (
    <Button
      onPress={handlePress}
      pointerEvents={loading ? "none" : "auto"}
      backgroundColor="$primary"
      w="$13"
      h="$13"
      br="$full"
      ai="center"
      jc="center"
    >
      {loading ? (
        <CircularIndicator size={30} progress={progress} />
      ) : (
        <AnimatedView entering={getFadeIn()} exiting={getFadeOut()}>
          <Icon icon="publish" size={28} color="white" />
        </AnimatedView>
      )}
    </Button>
  );
};

export default CaptureFooterPublishButton;
