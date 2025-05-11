import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Platform, TextInput, Keyboard, Animated, Easing } from "react-native";
import { useAuth } from "../../navigation/appNavigator";
import { COLORS, FONT_SIZE, SPACING } from "../../constants/theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { storage } from "../../lib/storage";
import { api } from "../../lib/api";

const LoginScreen = ({ navigation }) => {
	const { login } = useAuth();
	const insets = useSafeAreaInsets();
	const buttonOffset = useRef(new Animated.Value(0)).current;

	const [username, setUsername] = useState();
	const [password, setPassword] = useState();

	const [error, setError] = useState();

	useEffect(() => {
		const onKeyboardShow = ({ endCoordinates: { height } }) => {
			Animated.timing(buttonOffset, {
				toValue: height + 10,
				duration: 200,
				easing: Easing.out(Easing.circle),
				useNativeDriver: false,
			}).start();
		};
		const onKeyboardHide = () => {
			Animated.timing(buttonOffset, {
				toValue: 0,
				duration: 200,
				easing: Easing.out(Easing.circle),
				useNativeDriver: false,
			}).start();
		};

		const showEvent = Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow";
		const hideEvent = Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide";

		const showSub = Keyboard.addListener(showEvent, onKeyboardShow);
		const hideSub = Keyboard.addListener(hideEvent, onKeyboardHide);

		return () => {
			showSub.remove();
			hideSub.remove();
		};
	}, [buttonOffset]);

	async function handleLogin() {
		if (!username.trim().length || !password.trim().length) {
			return setError("Username and password are required");
		}

		await api.v2
			.post(
				"/auth/login",
				JSON.stringify({
					username,
					password,
				})
			)
			.then(async res => {
				storage.set("token", res?.data?.token);
				setError(null);
				login();
			})
			.catch(err => {
				setError(err?.response?.data?.error);
			});
	}

	return (
		<View style={[styles.container, { paddingBottom: Platform.OS === "ios" ? insets.bottom : insets.bottom + 6 }]}>
			<View style={styles.wrapper}>
				<Text style={styles.title}>Log in</Text>
				<TextInput
					onChangeText={text => setUsername(text)}
					style={styles.input}
					cursorColor={COLORS.white}
					maxLength={32}
					placeholderTextColor={COLORS.transparentText}
					placeholder='Username here'
				/>
				<TextInput
					onChangeText={text => setPassword(text)}
					style={styles.input}
					cursorColor={COLORS.white}
					maxLength={32}
					placeholderTextColor={COLORS.transparentText}
					placeholder='Password here'
				/>
				<TouchableOpacity onPress={() => navigation.navigate("Register")} activeOpacity={0.8} style={{ width: "100%" }}>
					<Text style={styles.dontText}>Don't have an account?</Text>
				</TouchableOpacity>
			</View>

			<Animated.View style={{ marginBottom: buttonOffset, width: "100%" }}>
				<TouchableOpacity onPress={handleLogin} activeOpacity={0.8} style={styles.button}>
					<Text style={styles.buttonText}>Log in</Text>
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

export default LoginScreen;
