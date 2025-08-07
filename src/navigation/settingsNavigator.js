import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ROUTES } from "../constants/routes";
import * as Screens from "src/screens";
import { settingsScreens } from "@constants/settingsScreens";

const Stack = createNativeStackNavigator();

const toComponentName = screenName => {
	return screenName.charAt(0).toUpperCase() + screenName.slice(1) + "Screen";
};

const SettingsNavigator = () => {
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
				animation: "simple_push",
				presentation: "card",
				gestureEnabled: true,
			}}
		>
			<Stack.Screen name={ROUTES.SETTINGS_MAIN} component={Screens.SettingsScreen} />

			{settingsScreens.flatMap(section =>
				section.data.map(({ screenName }) => {
					const ComponentName = toComponentName(screenName);
					const Component = Screens[ComponentName];

					if (!Component) return null;

					return <Stack.Screen key={screenName} name={screenName} component={Component} />;
				})
			)}
		</Stack.Navigator>
	);
};

export default SettingsNavigator;
