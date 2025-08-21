import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ProfileScreen, CaptureScreen, CategoryPage, NotifsScreen, PostScreen } from "../screens";
import AuthNavigator from "./AuthNavigator";
import { ROUTES } from "../constants/routes";
import MainTabNavigator from "./tabbar/tabBar.navigator";
import { useState, useEffect } from "react";
import { createSecureStorage } from "@lib/storage";
import { useTheme } from "tamagui";
import { Toaster } from "sonner-native";
import SettingsNavigator from "./settingsNavigator";
import * as SplashScreen from "expo-splash-screen";

const RootStack = createNativeStackNavigator();

const AppNavigator = () => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [isNavReady, setIsNavReady] = useState(false);
	const theme = useTheme();
	const backgroundColor = theme.bg;

	useEffect(() => {
		let listener;
		let storageInstance;

		const init = async () => {
			try {
				storageInstance = await createSecureStorage("user-storage");
				const token = storageInstance.getString("token");
				setIsAuthenticated(!!token);

				listener = storageInstance.addOnValueChangedListener((changedKey) => {
					if (changedKey === "token") {
						const nextToken = storageInstance.getString("token");
						setIsAuthenticated(!!nextToken);
					}
				});
			} finally {
				setIsLoading(false);
			}
		};

		init();

		return () => {
			try {
				listener?.remove();
			} catch { }
		};
	}, []);

	useEffect(() => {
		if (!isLoading && isNavReady) {
			SplashScreen.hideAsync().catch(() => { });
		}
	}, [isLoading, isNavReady]);

	if (isLoading) return null;

	return (
		<>
			<NavigationContainer onReady={() => setIsNavReady(true)}>
				<RootStack.Navigator screenOptions={{ headerShown: false, animation: "simple_push", presentation: "card", contentStyle: { backgroundColor } }}>
					{isAuthenticated && (
						<>
							<RootStack.Screen name='MainApp' component={MainTabNavigator} />
							<RootStack.Screen name={ROUTES.PUBLISH} component={CaptureScreen} />
							<RootStack.Screen name={ROUTES.CATEGORY_PAGE} component={CategoryPage} />
							<RootStack.Screen name={ROUTES.PROFILE} component={ProfileScreen} />
							<RootStack.Screen name={ROUTES.POST} component={PostScreen} />
							<RootStack.Screen name={ROUTES.NOTIFS} component={NotifsScreen} />
							<RootStack.Screen name={ROUTES.SETTINGS} component={SettingsNavigator} />
						</>
					)}
					<RootStack.Screen name={ROUTES.AUTH} component={AuthNavigator} />
				</RootStack.Navigator>
			</NavigationContainer>
			<Toaster />
		</>
	);
};

export default AppNavigator;
