import { Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function useInsets () {
  const insets = useSafeAreaInsets();

  return {
    top: Platform.OS === "ios" ? insets.top : insets.top + 6,
    bottom: Platform.OS === "ios" ? insets.bottom : insets.bottom + 8,
  };
}
