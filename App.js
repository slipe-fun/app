import { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AppNavigator from "./src/navigation/AppNavigator";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Platform } from "react-native";
import * as NavigationBar from "expo-navigation-bar";

export default function App() {
	useEffect(() => {
		if (Platform.OS === "android") {
			const configureNavigationBar = async () => {
				await NavigationBar.setPositionAsync("absolute");
				await NavigationBar.setBackgroundColorAsync("transparent");
				await NavigationBar.setButtonStyleAsync("light");
			};
			configureNavigationBar();
		}
	}, []);

	return (
		<SafeAreaProvider>
			<GestureHandlerRootView style={{ flex: 1 }}>
				<StatusBar style='light' />
				<AppNavigator />
			</GestureHandlerRootView>
		</SafeAreaProvider>
	);
}
