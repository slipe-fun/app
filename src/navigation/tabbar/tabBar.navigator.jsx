import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TabBar from "./tabBar";
import { ROUTES } from "@constants/routes";
import { BlogsScreen, ProfileScreen, SearchScreen } from "@screens";

const Tab = createBottomTabNavigator();

export default function MainTabNavigator() {
	return (
		<Tab.Navigator
			tabBar={props => <TabBar {...props} />}
			screenOptions={{
				headerShown: false,
			}}
		>
			<Tab.Screen name={ROUTES.TAB_BLOGS} component={BlogsScreen} />
            <Tab.Screen name={ROUTES.TAB_SEARCH} component={SearchScreen} />
			<Tab.Screen name={ROUTES.TAB_PROFILE} component={ProfileScreen} />
		</Tab.Navigator>
	);
}

