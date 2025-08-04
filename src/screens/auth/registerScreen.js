import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Platform, TextInput } from "react-native";
import { useAuth } from "../../navigation/appNavigator";
import { COLORS, FONT_SIZE, SPACING } from "../../constants/theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { createSecureStorage } from "@lib/storage";
import { api } from "@lib/api";
import isRegistrationDataCorrect from "../../lib/auth/signUp/isDataCorrect";
import { useKeyboard } from "@react-native-community/hooks";
import Animated, { useAnimatedStyle, useSharedValue, withTiming, Easing, ReduceMotion } from "react-native-reanimated";
import { toast } from "sonner-native";
import { useTranslation } from "react-i18next";
import { ROUTES } from "@constants/routes";

const RegisterScreen = ({ navigation }) => {
	const { login } = useAuth();
	const insets = useSafeAreaInsets();
	const buttonOffset = useSharedValue(0);
	const { t } = useTranslation();
	const keyboard = useKeyboard();

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const buttonAnimatedStyles = useAnimatedStyle(() => {
		return {
			paddingBottom: buttonOffset.value,
		};
	});

	async function handleRegister() {
		const isDataCorrect = isRegistrationDataCorrect(username, password);

		for (const key in isDataCorrect) {
			if (!isDataCorrect[key]?.success) {
				toast.error(isDataCorrect[key]?.message);
				return;
			}
		}

		try {
			const res = await api.v2.post(
				"/auth/register",
				JSON.stringify({
					username,
					password,
				})
			);

			const storage = await createSecureStorage("user-storage")
			storage.set("token", res?.data?.token);
			login();
		} catch (err) {
			toast.error(err?.response?.data?.error);
		}
	}

	useEffect(() => {
		buttonOffset.value = withTiming(keyboard.keyboardShown ? keyboard.keyboardHeight + 10 : 0, {
			duration: 100,
			easing: Easing.linear,
			reduceMotion: ReduceMotion.Never,
		});
	}, [keyboard]);

	return (
		<View style={[styles.container, { paddingBottom: Platform.OS === "ios" ? insets.bottom : insets.bottom + 6 }]}>
			<View style={styles.wrapper}>
				<Text style={styles.title}>{t('register.title')}</Text>
				<TextInput
					style={styles.input}
					onChangeText={text => setUsername(text)}
					cursorColor={COLORS.white}
					maxLength={32}
					placeholderTextColor={COLORS.transparentText}
					placeholder={t('register.inputUsername')}
				/>
				<TextInput
					secureTextEntry
					style={styles.input}
					onChangeText={text => setPassword(text)}
					cursorColor={COLORS.white}
					maxLength={32}
					placeholderTextColor={COLORS.transparentText}
					placeholder={t('register.inputPassword')}
				/>
				<TouchableOpacity onPress={() => navigation.navigate(ROUTES.LOGIN)} activeOpacity={0.8} style={{ width: "100%" }}>
					<Text style={styles.dontText}>{t('register.haveAccount')}</Text>
				</TouchableOpacity>
			</View>

			<Animated.View style={[buttonAnimatedStyles, { width: "100%" }]}>
				<TouchableOpacity onPress={handleRegister} activeOpacity={0.8} style={styles.button}>
					<Text style={styles.buttonText}>{t('register.button')}</Text>
				</TouchableOpacity>
			</Animated.View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: SPACING.large,
		backgroundColor: COLORS.black,
		width: "100%",
	},
	input: {
		backgroundColor: COLORS.elemBackground,
		width: "100%",
		fontSize: FONT_SIZE.medium,
		padding: 14,
		color: COLORS.white,
		borderRadius: 12,
	},
	wrapper: {
		flex: 1,
		gap: SPACING.large,
		alignItems: "center",
		justifyContent: "center",
		width: "100%",
	},
	title: {
		fontSize: 24,
		fontFamily: "700",
		textAlign: "center",
		color: COLORS.white,
	},
	button: {
		backgroundColor: COLORS.primary,
		width: "100%",
		paddingVertical: 12,
		borderRadius: 12,
		alignItems: "center",
	},
	buttonText: {
		color: COLORS.white,
		textAlign: "center",
		fontFamily: "600",
		fontSize: FONT_SIZE.medium,
	},
	dontText: {
		color: COLORS.transparentText,
		textAlign: "center",
	},
});

export default RegisterScreen;
