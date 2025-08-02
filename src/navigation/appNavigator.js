import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CustomTabBar from "../components/ui/tabBar/tabBar";
import { BlogsScreen, SearchScreen, ProfileScreen, CaptureScreen, CategoryPage, NotifsScreen } from "../screens";
import AuthNavigator from "./AuthNavigator";
import { ROUTES } from "../constants/routes";
import { useState, createContext, useContext, useEffect } from "react";
import { storage } from "../lib/storage";
import { useTheme } from "tamagui";
import { Toaster } from "sonner-native";
import SettingsNavigator from "./settingsNavigator";

export const AuthContext = createContext(null);

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
	const theme = useTheme();
	const backgroundColor = theme.bg;

	useEffect(() => {
		const checkAuth = async () => {
			try {
				const storageInstance = await storage();
				const token = storageInstance?.getString("token");
				setIsAuthenticated(!!token);
			} finally {
				setIsLoading(false);
			}
		};

		checkAuth();
	}, []);

	const authContextValue = {
		isAuthenticated,
		login: () => setIsAuthenticated(true),
		logout: async () => {
			try {
				const storageInstance = await storage();
				storageInstance.delete("token");
				setIsAuthenticated(false);
			} catch (error) {
				throw error
			}
		},
	};

	return (
		<AuthContext.Provider value={authContextValue}>
			<NavigationContainer>
				<RootStack.Navigator screenOptions={{ headerShown: false, animation: "simple_push", presentation: "card", gestureEnabled: true, contentStyle: { backgroundColor } }}>
					{isAuthenticated ? (
						<>
						<RootStack.Screen name='MainApp' component={MainTabNavigator} />
						<RootStack.Screen name={ROUTES.PUBLISH} component={CaptureScreen} />
						<RootStack.Screen name={ROUTES.CATEGORY_PAGE} component={CategoryPage} />
						<RootStack.Screen name={ROUTES.NOTIFS} component={NotifsScreen} />
						<RootStack.Screen name={ROUTES.SETTINGS} component={SettingsNavigator}/>
						</>
					) : (
						<RootStack.Screen name={ROUTES.AUTH} component={AuthNavigator} />
					)}
				</RootStack.Navigator>
			</NavigationContainer>
			<Toaster/>
		</AuthContext.Provider> 
	);
};

export const useAuth = () => useContext(AuthContext);

export default AppNavigator;
