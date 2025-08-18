import AuthScreenTitle from "@components/common/authScreen/main/screenTitle";
import { YStack, View } from "tamagui";
import AuthAnimatedInput from "@components/common/authScreen/main/animatedInput";
import useAuthStore from "@stores/authScreen";
import { useState, useCallback, useEffect } from "react";
import Animated, {
  useAnimatedKeyboard,
  useAnimatedStyle,
} from "react-native-reanimated";
import AuthTip from "@components/common/authScreen/main/tip";
import AuthTypeSwitcher from "@components/common/authScreen/main/typeSwitcher";
import AuthFooter from "@components/common/authScreen/footer";
import Counter from "@components/ui/counter";
import { toast } from "sonner-native";
import { api } from "@lib/api";
import { createSecureStorage } from "@lib/storage";

const AnimatedYStack = Animated.createAnimatedComponent(YStack);

export default function AuthLoginScreen({ navigation }) {
  const { setPassword, password, username, setUsername } = useAuthStore();
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [usernameFocused, setUsernameFocused] = useState(false);
  const [type, setType] = useState(true);
  const [active, setActive] = useState(true);
  const keyboard = useAnimatedKeyboard({
    isStatusBarTranslucentAndroid: true,
    isNavigationBarTranslucentAndroid: true,
  });

  const renderSwitcher = useCallback(
    (type, render, setType) => {
      return (
        <AuthTypeSwitcher
          type={type}
          visible={render}
          position="absolute"
          right="$0"
          ph="$6"
          alignItems="center"
          setType={setType}
        />
      );
    },
    [type]
  );

  const renderCounter = useCallback(
    (value, max, render) => {
      return (
        <Counter
          value={value}
          max={max}
          position="absolute"
          right="$0"
          ph="$6"
          alignItems="center"
          visible={render}
        />
      );
    },
    [username.length]
  );

  const animatedYstackStyle = useAnimatedStyle(() => {
    const keyboardHeight = keyboard.height;
    return {
      transform: [{ translateY: -keyboardHeight.value / 2 }],
    };
  });

  async function callback() {
    try {
      setActive(false);
      const res = await api.v2.post(
        "/auth/login",
        JSON.stringify({ username, password }),
        {
          "Content-Type": "application/json",
        }
      );
      setActive(true);

      const token = res?.data?.token;

      const storage = await createSecureStorage("user-storage");

      if (!token) toast.error("Unknown error");
      storage.set("token", token);

      return true;
    } catch (error) {
      setActive(true);
      toast.error(error?.response?.data?.error || error?.message);
      return false;
    }
  }

  useEffect(() => {
    let listener;
    async function init() {
      const storage = await createSecureStorage("user-storage");
      listener = storage.addOnValueChangedListener((changedKey) => {
        if (changedKey === "token") {
         setTimeout(() => {
          navigation.navigate("MainApp");
         }, 1);
        }
      });
    }
    init();
    return () => {
      try {
        listener?.remove();
      } catch { }
    };
  }, []);

  return (
    <View f={1} backgroundColor="$bg">
      <AnimatedYStack
        ph="$7"
        gap="$7"
        flex={1}
        justifyContent="center"
        backgroundColor="$bg"
        style={animatedYstackStyle}
      >
        <AuthScreenTitle
          shadowed={passwordFocused || usernameFocused}
          title="login_title"
          source={require("@assets/auth/house.webp")}
        />
        <AuthAnimatedInput
          maxLength={24}
          placeholder="username_placeholder"
          value={username}
          onFocus={() => setUsernameFocused(true)}
          onBlur={() => setUsernameFocused(false)}
          onChangeText={setUsername}
          action={renderCounter(username.length, 24, usernameFocused)}
        />
        <AuthAnimatedInput
          maxLength={64}
          placeholder="password_placeholder"
          value={password}
          onFocus={() => setPasswordFocused(true)}
          onBlur={() => setPasswordFocused(false)}
          onChangeText={setPassword}
          secureTextEntry={type}
          action={renderSwitcher(type, passwordFocused, setType)}
        />
        <AuthTip
          text="password_tip"
          shadowed={passwordFocused || usernameFocused}
        />
      </AnimatedYStack>
      <AuthFooter
        navigation={navigation}
        active={username.length > 0 && password.length > 0 && active}
        callback={callback}
      />
    </View>
  );
}
