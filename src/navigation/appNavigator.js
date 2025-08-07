import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CustomTabBar from "../components/ui/tabBar/tabBar";
import { BlogsScreen, SearchScreen, ProfileScreen, CaptureScreen, CategoryPage, NotifsScreen } from "../screens";
import AuthNavigator from "./AuthNavigator";
import { ROUTES } from "../constants/routes";
import { useState, useEffect } from "react";
import { createSecureStorage } from "@lib/storage";
import { useTheme } from "tamagui";
import { Toaster } from "sonner-native";
import SettingsNavigator from "./settingsNavigator";
import * as SplashScreen from "expo-splash-screen";

const Tab = createBottomTabNavigator();
const RootStack = createNativeStackNavigator();

const MainTabNavigator = () => {
	return (
		<Tab.Navigator
			tabBar={props => <CustomTabBar {...props} />}
			screenOptions={{
				headerShown: false,
			}}
		>
			<Tab.Screen name={ROUTES.BLOGS} component={BlogsScreen} />
			<Tab.Screen name={ROUTES.PROFILE} component={ProfileScreen} />
			<Tab.Screen name={ROUTES.SEARCH} component={SearchScreen} />
		</Tab.Navigator>
	);
};

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
				<RootStack.Navigator screenOptions={{ headerShown: false, animation: "simple_push", presentation: "card", gestureEnabled: true, contentStyle: { backgroundColor } }}>
					{isAuthenticated ? (
						<>
							<RootStack.Screen name='MainApp' component={MainTabNavigator} />
							<RootStack.Screen name={ROUTES.PUBLISH} component={CaptureScreen} />
							<RootStack.Screen name={ROUTES.CATEGORY_PAGE} component={CategoryPage} />
							<RootStack.Screen name={ROUTES.NOTIFS} component={NotifsScreen} />
							<RootStack.Screen name={ROUTES.SETTINGS} component={SettingsNavigator} />
						</>
					) : (
						<RootStack.Screen name={ROUTES.AUTH} component={AuthNavigator} />
					)}
				</RootStack.Navigator>
			</NavigationContainer>
			<Toaster />
		</>
	);
};

export default AppNavigator;
