import React, { useEffect } from "react";
import { View } from "react-native";
import { colors } from "../constants/Theme";
import { Platform } from "react-native";
import UsersSlider from "../components/common/blogsScreen";
import * as NavigationBar from 'expo-navigation-bar';
import { useSafeAreaInsets } from "react-native-safe-area-context";

const BlogsScreen = () => {
	const insets = useSafeAreaInsets();
  
	useEffect(() => {
		if (Platform.OS === "android") {
			const configureNavigationBar = async () => {
				await NavigationBar.setPositionAsync("absolute");
				await NavigationBar.setBackgroundColorAsync("transparent");
				await NavigationBar.setButtonStyleAsync("light");
			};
			configureNavigationBar();
		}
	}, []);

	return (
		<View style={{ flex: 1, paddingTop: insets.top + 6, backgroundColor: colors.black }}>
			<UsersSlider />
		</View>
	);
};

export default BlogsScreen;
