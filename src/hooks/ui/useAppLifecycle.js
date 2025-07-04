import { useAppState } from "@react-native-community/hooks";
import { useIsFocused } from "@react-navigation/native";

export default function useAppLifecycle() {
	const appState  = useAppState();
	const isFocused = useIsFocused();
	return isFocused && appState === "active";
}
