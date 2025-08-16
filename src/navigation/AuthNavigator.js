import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ROUTES } from "../constants/routes";
import { AuthUsernameScreen, AuthPasswordScreen, AuthAvatarScreen, AuthFinishScreen, AuthWelcomeScreen } from "../screens";
import AuthFooter from "@components/common/authScreen/footer";
import { useNavigation } from "@react-navigation/native";

const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
  const navigation = useNavigation();

  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: "simple_push",
          presentation: "card",
          gestureEnabled: true,
        }}
      >
        <Stack.Screen name={ROUTES.AUTH_WELCOME} component={AuthWelcomeScreen} />
        <Stack.Screen name={ROUTES.AUTH_USERNAME} component={AuthUsernameScreen} />
        <Stack.Screen name={ROUTES.AUTH_PASSWORD} component={AuthPasswordScreen} />
        <Stack.Screen name={ROUTES.AUTH_AVATAR} component={AuthAvatarScreen} />
        <Stack.Screen name={ROUTES.AUTH_FINISH} component={AuthFinishScreen} />
      </Stack.Navigator>
    </>
  );
};

export default AuthNavigator;
