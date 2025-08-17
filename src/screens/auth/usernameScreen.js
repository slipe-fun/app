import AuthScreenTitle from "@components/common/authScreen/main/screenTitle";
import { YStack, View } from "tamagui";
import AuthAnimatedInput from "@components/common/authScreen/main/animatedInput";
import useAuthStore from "@stores/authScreen";
import Counter from "@components/ui/counter";
import { useCallback, useEffect, useState } from "react";
import Animated, {
  useAnimatedKeyboard,
  useAnimatedStyle,
} from "react-native-reanimated";
import AuthTip from "@components/common/authScreen/main/tip";
import AuthFooter from "@components/common/authScreen/footer";
import { api } from "@lib/api";
import isUsernameCorrect from "@lib/auth/isUsernameCorrect";

const AnimatedYStack = Animated.createAnimatedComponent(YStack);

const AuthUsernameScreen = ({ navigation }) => {
  const { setUsername, username } =
    useAuthStore();
  const [usernameFocused, setUsernameFocused] = useState(false);
  const [error, setError] = useState(null);
  const [active, setActive] = useState(false);
  const keyboard = useAnimatedKeyboard({
    isStatusBarTranslucentAndroid: true,
    isNavigationBarTranslucentAndroid: true,
  });

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

  async function check() {
    try {
      setActive(false);
      const user = await api.v2.get("/user/" + username);
      setActive(true);
      if (!user) return true;
      
    // dikiy pls do redirect to login

      return false;
    } catch (error) {
      setActive(true);
      if (error?.status === 404) return true;

      return false;
    }
  }

  useEffect(() => {
    const usernameCheck = isUsernameCorrect(username);
    
    setError(usernameCheck?.message);
    setActive(usernameCheck.success);
  }, [username]);

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
          shadowed={usernameFocused}
          title="username_title"
          source={require("@assets/auth/badge.webp")}
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
        <AuthTip
          text="username_tip"
          shadowed={usernameFocused}
        />
      </AnimatedYStack>
      <AuthFooter navigation={navigation} active={active} nextRoute={2} callback={check} />
    </View>
  );
};

export default AuthUsernameScreen;
