import { View } from "tamagui";
import useFetchSearchHints from "@hooks/useFetchSearchHints";
import useSearchStore from "@stores/searchScreen";
import RecentlyQuery from "./recentlyQuery";
import { useEffect } from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import useInsets from "@hooks/ui/useInsets";
import { normalSpring } from "@constants/easings";

const AnimatedView = Animated.createAnimatedComponent(View);

const Hints = () => {
  const query = useSearchStore((state) => state.query);
  const type = useSearchStore((state) => state.type);
  const isFocused = useSearchStore((state) => state.isFocused);
  const insets = useInsets();
  const { data } = useFetchSearchHints(query, type);
  const resultsOpacity = useSharedValue(0);

  const resultsStyle = useAnimatedStyle(() => ({
    opacity: resultsOpacity.value,
    pointerEvents: resultsOpacity.value === 0 ? "none" : "auto",
  }));

  useEffect(() => {
    resultsOpacity.value = withSpring(isFocused ? 1 : 0, normalSpring);
  }, [isFocused]);

  return (
    <AnimatedView
      left={0}
      right={0}
      bottom={0}
      backgroundColor="$bg"
      position="absolute"
      zIndex="$2"
      ph="$6"
      top={60 + insets.top}
      pt="$6"
      gap="$6"
      style={resultsStyle}
    >
      {data.map((item, index) => (
        <RecentlyQuery isHint key={index} result={item} index={index} />
      ))}
    </AnimatedView>
  );
};

export default Hints;
