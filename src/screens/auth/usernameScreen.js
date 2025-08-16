import AuthScreenTitle from "@components/common/authScreen/main/screenTitle";
import { YStack, View } from "tamagui";
import AuthAnimatedInput from "@components/common/authScreen/main/animatedInput";
import useAuthStore from "@stores/authScreen";
import Counter from "@components/ui/counter";
import { useCallback, useState } from "react";
import Animated, {
  useAnimatedKeyboard,
  useAnimatedStyle,
} from "react-native-reanimated";
import AuthTip from "@components/common/authScreen/main/tip";
import AuthFooter from "@components/common/authScreen/footer";

const AnimatedYStack = Animated.createAnimatedComponent(YStack);

const AuthUsernameScreen = ({ navigation }) => {
  const { setUsername, setNickname, username, nickname } =
    useAuthStore();
  const [usernameFocused, setUsernameFocused] = useState(false);
  const [nicknameFocused, setNicknameFocused] = useState(false);
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
    [username.length, nickname.length]
  );

  const animatedYstackStyle = useAnimatedStyle(() => {
    const keyboardHeight = keyboard.height;
    return {
      transform: [{ translateY: -keyboardHeight.value / 2 }],
    };
  });

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
          shadowed={usernameFocused || nicknameFocused}
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
        <AuthAnimatedInput
          maxLength={32}
          placeholder="username_nickname_placeholder"
          value={nickname}
          onFocus={() => setNicknameFocused(true)}
          onBlur={() => setNicknameFocused(false)}
          onChangeText={setNickname}
          action={renderCounter(nickname.length, 32, nicknameFocused)}
        />
        <AuthTip
          text="username_tip"
          shadowed={usernameFocused || nicknameFocused}
        />
      </AnimatedYStack>
      <AuthFooter navigation={navigation} active={username.length >= 2} nextRoute={2}/>
    </View>
  );
};

export default AuthUsernameScreen;
