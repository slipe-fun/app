import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ROUTES } from "../constants/routes";
import WelcomeScreen from "../screens/auth/welcomeScreen";
import LoginScreen from "../screens/auth/loginScreen";
import RegisterScreen from "../screens/auth/registerScreen";
import AuthFooter from "@components/common/authScreen/footer";

const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
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
        <Stack.Screen name={ROUTES.AUTH_WELCOME} component={WelcomeScreen} />
        <Stack.Screen name={ROUTES.LOGIN} component={LoginScreen} />
        <Stack.Screen name={ROUTES.REGISTER} component={RegisterScreen} />
      </Stack.Navigator>
      <AuthFooter />
    </>
  );
};

export default AuthNavigator;
