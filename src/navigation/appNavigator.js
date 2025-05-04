import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CustomTabBar from "../components/ui/tabBar";
import BlogsScreen from "../screens/blogsScreen";
import PublishScreen from "../screens/publishScreen";
import SearchScreen from "../screens/searchScreen";
import ProfileScreen from "../screens/profileScreen";
import AuthNavigator from "./AuthNavigator";
import { ROUTES } from "../constants/routes";
import { useState, createContext, useContext, useEffect } from "react";
import { storage } from "../lib/storage";
import NotifsScreen from "../screens/notifsScreen";

export const AuthContext = createContext(null);

const Tab = createBottomTabNavigator();
const RootStack = createNativeStackNavigator();

const MainTabNavigator = () => {
	return (
		<Tab.Navigator
			tabBar={props => <CustomTabBar {...props} />}
			screenOptions={{
				headerShown: false
			}}
		>
			<Tab.Screen name={ROUTES.BLOGS} component={BlogsScreen} />
			<Tab.Screen name={ROUTES.NOTIFS} component={NotifsScreen} />
			<Tab.Screen name={ROUTES.PUBLISH} component={PublishScreen} />
			<Tab.Screen name={ROUTES.SEARCH} component={SearchScreen} />
			<Tab.Screen name={ROUTES.PROFILE} component={ProfileScreen} />
		</Tab.Navigator>
	);
};

const AppNavigator = () => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		setIsAuthenticated(!!storage.getString("token"));
		setIsLoading(false);
	}, []);
	
	const authContextValue = {
		isAuthenticated,
		login: () => setIsAuthenticated(true),
		logout: () => setIsAuthenticated(false)
	};

	return (
		<AuthContext.Provider value={authContextValue}>
			<NavigationContainer>
				<RootStack.Navigator screenOptions={{ headerShown: false }}>
					{!isLoading ? isAuthenticated ? (
						<RootStack.Screen name="MainApp" component={MainTabNavigator} />
					) : (
						<RootStack.Screen name={ROUTES.AUTH} component={AuthNavigator} />
					) : <RootStack.Screen name={"Loading"} component={() => <></>} />}
				</RootStack.Navigator>
			</NavigationContainer>
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);

export default AppNavigator;
