import { useCallback } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AppNavigator from "./src/navigation/appNavigator";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as NavigationBar from "expo-navigation-bar";
import { useFonts } from "expo-font";
import { TamaguiProvider, Theme } from "tamagui";
import * as SplashScreen from "expo-splash-screen";
import { Provider } from "react-redux";
import store from "./src/store";
import { enableScreens } from "react-native-screens";
import { Platform } from "react-native";
import configUI from "./tamagui.config";

enableScreens();

const fontsToLoad = {
  "OpenRunde-Regular": require("./assets/fonts/OpenRunde-Regular.ttf"),
  "OpenRunde-Medium": require("./assets/fonts/OpenRunde-Medium.ttf"),
  "OpenRunde-Semibold": require("./assets/fonts/OpenRunde-Semibold.ttf"),
  "OpenRunde-Bold": require("./assets/fonts/OpenRunde-Bold.ttf"),
};

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded, fontError] = useFonts(fontsToLoad);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
      if (Platform.OS === "android") {
        await NavigationBar.setBehaviorAsync("inset-swipe");
        await NavigationBar.setPositionAsync("absolute");
        await NavigationBar.setBackgroundColorAsync("#00000000");
        await NavigationBar.setButtonStyleAsync("light");
      }
    }
  }, [fontsLoaded, fontError]);

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView
        style={{ flex: 1, backgroundColor: "black" }}
        onLayout={onLayoutRootView}
      >
        <StatusBar translucent style="light" />
        <Provider store={store}>
          <TamaguiProvider config={configUI}>
			<Theme name="dark">
            <AppNavigator />
			</Theme>
          </TamaguiProvider>
        </Provider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
