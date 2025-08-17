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
import isPasswordCorrect from "@lib/auth/isPasswordCorrect";
import { toast } from "sonner-native";

const AnimatedYStack = Animated.createAnimatedComponent(YStack);

const AuthPasswordScreen = ({ navigation }) => {
  const { setPassword, password, passwordConfirm, setPasswordConfirm } = useAuthStore();
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [passwordConfirmFocused, setPasswordConfirmFocused] = useState(false);
  const [type, setType] = useState(true);
  const [repeatType, setRepeatType] = useState(true);
  const [active, setActive] = useState(false);
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
    [type, repeatType]
  );

  const animatedYstackStyle = useAnimatedStyle(() => {
    const keyboardHeight = keyboard.height;
    return {
      transform: [{ translateY: -keyboardHeight.value / 2 }],
    };
  });

  useEffect(() => {
    const passwordCheck = isPasswordCorrect(password, passwordConfirm);

    if (passwordCheck?.message && password > 0) toast.error(passwordCheck?.message);
    setActive(passwordCheck?.success);
  }, [password, passwordConfirm]);

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
          shadowed={passwordFocused || passwordConfirmFocused}
          title="password_title"
          source={require("@assets/auth/monkey.webp")}
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
        <AuthAnimatedInput
          maxLength={64}
          placeholder="password_confirm_placeholder"
          value={passwordConfirm}
          onFocus={() => setPasswordConfirmFocused(true)}
          onBlur={() => setPasswordConfirmFocused(false)}
          onChangeText={setPasswordConfirm}
          secureTextEntry={repeatType}
          action={renderSwitcher(repeatType, passwordConfirmFocused, setRepeatType)}
        />
        <AuthTip
          text="password_tip"
          shadowed={passwordFocused || passwordConfirmFocused}
        />
      </AnimatedYStack>
      <AuthFooter navigation={navigation} active={active} nextRoute={3} />
    </View>
  );
};

export default AuthPasswordScreen;
