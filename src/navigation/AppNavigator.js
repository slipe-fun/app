import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CustomTabBar from "../components/ui/tabBar";
import BlogsScreen from "../screens/blogsScreen";
import PublishScreen from "../screens/publishScreen";
import SearchScreen from "../screens/searchScreen";
import { ROUTES } from "../constants/routes";
import ProfileScreen from "../screens/profileScreen";

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
