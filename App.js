import { useEffect, useCallback } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AppNavigator from "./src/navigation/appNavigator";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as NavigationBar from "expo-navigation-bar";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { Provider } from "react-redux";
import store from "./src/store";
import { enableScreens } from "react-native-screens";

enableScreens();

const fontsToLoad = {
	400: require("./assets/fonts/OpenRunde-Regular.ttf"),
	500: require("./assets/fonts/OpenRunde-Medium.ttf"),
	600: require("./assets/fonts/OpenRunde-Semibold.ttf"),
	700: require("./assets/fonts/OpenRunde-Bold.ttf"),
};

SplashScreen.preventAutoHideAsync();

export default function App() {
	const [fontsLoaded, fontError] = useFonts(fontsToLoad);

	useEffect(() => {
		(async () => {
			await NavigationBar.setBehaviorAsync("inset-swipe");
			await NavigationBar.setPositionAsync("absolute");
			await NavigationBar.setBackgroundColorAsync("#00000000");
			await NavigationBar.setButtonStyleAsync("light");
		  })();
	}, []);

	const onLayoutRootView = useCallback(async () => {
		if (fontsLoaded || fontError) {
			await SplashScreen.hideAsync();
		}
	}, [fontsLoaded, fontError]);

	if (!fontsLoaded && !fontError) {
		return null;
	}

	return (
		<SafeAreaProvider>
			<GestureHandlerRootView style={{ flex: 1 }} onLayout={onLayoutRootView}>
				<StatusBar translucent style='light' />
				<Provider store={store}>
					<AppNavigator />
				</Provider>
			</GestureHandlerRootView>
		</SafeAreaProvider>
	);
}
