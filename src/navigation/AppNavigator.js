import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CustomTabBar from "../components/ui/TabBar";
import BlogsScreen from "../screens/BlogsScreen";
import PublishScreen from "../screens/PublishScreen";
import SearchScreen from "../screens/SearchScreen";
import { ROUTES } from "../constants/Routes";
import ProfileScreen from "../screens/ProfileScreen";

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
	return (
		<NavigationContainer>
			<Tab.Navigator
				tabBar={props => <CustomTabBar {...props} />}
				screenOptions={{
					headerShown: false
				}}
			>
				<Tab.Screen name={ROUTES.BLOGS} component={BlogsScreen} />
				<Tab.Screen name={ROUTES.PUBLISH} component={PublishScreen} />
				<Tab.Screen name={ROUTES.SEARCH} component={SearchScreen} />
				<Tab.Screen name={ROUTES.PROFILE} component={ProfileScreen} />
			</Tab.Navigator>
		</NavigationContainer>
	);
};

export default AppNavigator;
