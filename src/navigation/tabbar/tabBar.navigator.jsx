import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ROUTES } from "@constants/routes";
import { BlogsScreen, ProfileScreen, SearchScreen } from "@screens";
import TabBar from "./tabBar";
import { normalSpring } from "@constants/easings";
import { useTheme } from "tamagui";

const Tab = createBottomTabNavigator();

const options = {
  transitionSpec: {
    animation: "spring",
    config: {
      mass: normalSpring.mass,
      damping: normalSpring.damping,
      stiffness: normalSpring.stiffness,
    },
  },
};

export default function MainTabNavigator() {
  const theme = useTheme();
  const bg = theme.bg.get();

  return (
    <Tab.Navigator
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{
        headerShown: false,
        sceneStyle: {
          backgroundColor: bg,
        },
        animation: "shift",
      }}
    >
      <Tab.Screen
        options={options}
        name={ROUTES.TAB_BLOGS}
        component={BlogsScreen}
      />
      <Tab.Screen
        options={options}
        name={ROUTES.TAB_SEARCH}
        component={SearchScreen}
      />
      <Tab.Screen
        options={options}
        name={ROUTES.TAB_PROFILE}
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
}
