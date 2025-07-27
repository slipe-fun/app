import { useEffect, useState } from "react";
import { useWindowDimensions } from "react-native";
import { Gesture } from "react-native-gesture-handler";
import { runOnJS } from "react-native-reanimated";

export default function useBlogsGestures(isActive, postsLength) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);
  const { width: screenWidth } = useWindowDimensions();

  const updateIndex = delta => {
    setActiveIndex(prev => {
      const next = prev + delta;
      if (next < 0 || next >= postsLength) return prev;
      return next;
    });
  };

  useEffect(() => {
    if (isActive) {
      setActiveIndex(0);
    }
  }, [isActive]);

  const tapGesture = Gesture.Tap()
    .maxDuration(250)
    .onEnd(event => {
      const delta = event.x < screenWidth / 2 ? -1 : 1;
      runOnJS(updateIndex)(delta);
    });

  const longPressGesture = Gesture.LongPress()
    .minDuration(200)
    .onStart(() => {
      runOnJS(setIsSeeking)(true);
    })
    .onEnd(() => {
      runOnJS(setIsSeeking)(false);
    });


  const gesture = Gesture.Race(longPressGesture, tapGesture);

  return { gesture, activeIndex, updateIndex, isSeeking };
}
