import { Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useNavigationStore from "@stores/navigation";

export default function useInsets (include = false) {
  const insets = useSafeAreaInsets();
  const { bottomOffset } = useNavigationStore();

  return {
    top: Platform.OS === "ios" ? insets.top : insets.top + 6,
    bottom: include ? bottomOffset : Platform.OS === "ios" ? insets.bottom : insets.bottom + 8,
  };
}
