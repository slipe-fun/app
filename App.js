import "./i18n";

import configUI from "./tamagui.config";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AppNavigator from "./src/navigation/appNavigator";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as NavigationBar from "expo-navigation-bar";
import { useFonts } from "expo-font";
import { TamaguiProvider, Theme } from "tamagui";
import * as SplashScreen from "expo-splash-screen";
import { enableScreens } from "react-native-screens";
import { Platform } from "react-native";

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

  const onLayoutRootView = async () => {
    if (Platform.OS === "android") {
      await NavigationBar.setButtonStyleAsync("dark");
      await NavigationBar.setBackgroundColorAsync("#000000");
      await NavigationBar.setPositionAsync("absolute");
    }
  };

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1, backgroundColor: "#000000" }} onLayout={onLayoutRootView}>
        <StatusBar style="light" />
        <TamaguiProvider config={configUI}>
          <Theme name="dark">
            <AppNavigator />
          </Theme>
        </TamaguiProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
