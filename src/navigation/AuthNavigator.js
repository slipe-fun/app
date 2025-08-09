import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ROUTES } from "../constants/routes";
import WelcomeScreen from "../screens/auth/welcomeScreen";
import LoginScreen from "../screens/auth/loginScreen";
import RegisterScreen from "../screens/auth/registerScreen";
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
        <Stack.Screen name={ROUTES.AUTH_WELCOME} component={WelcomeScreen} />
        <Stack.Screen name={ROUTES.AUTH_USERNAME} component={LoginScreen} />
        <Stack.Screen name={ROUTES.AUTH_PASSWORD} component={RegisterScreen} />
        <Stack.Screen name={ROUTES.AUTH_AVATAR} component={RegisterScreen} />
        <Stack.Screen name={ROUTES.AUTH_FINISH} component={RegisterScreen} />
      </Stack.Navigator>

      <AuthFooter navigation={navigation} />
    </>
  );
};

export default AuthNavigator;
